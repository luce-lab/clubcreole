# Stripe Webhook Edge Function

This Supabase Edge Function handles Stripe webhook events for subscription management.

## Environment Variables Required

```bash
STRIPE_SECRET_KEY=sk_test_...           # Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...         # Stripe webhook secret
SUPABASE_URL=your-project-url           # Supabase project URL
SUPABASE_SERVICE_ROLE_KEY=your-key      # Supabase service role key
```

## Testing with Stripe CLI

### 1. Install Stripe CLI
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Or download from https://stripe.com/docs/stripe-cli
```

### 2. Login to Stripe
```bash
stripe login
```

### 3. Forward webhooks to local development
```bash
# Start your local development server first
npm run dev

# Then forward webhooks (port 54321 is default for Supabase local)
stripe listen --forward-to localhost:54321/functions/v1/stripe-webhook
```

### 4. Test events
```bash
# Trigger test events
stripe trigger invoice.payment_succeeded
stripe trigger invoice.payment_failed
stripe trigger customer.subscription.deleted
stripe trigger customer.subscription.updated
```

### 5. Test manually with curl
```bash
# First, get a real event ID from Stripe CLI or dashboard
EVENT_ID="evt_..."

# Create a test payload
cat > test_webhook.json << EOF
{
  "id": "evt_test_12345",
  "object": "event",
  "type": "invoice.payment_succeeded",
  "data": {
    "object": {
      "id": "in_test_12345",
      "object": "invoice",
      "status": "paid",
      "amount_paid": 1500
    }
  }
}
EOF

# Test the endpoint (replace with your actual secret)
STRIPE_WEBHOOK_SECRET="whsec_test_..."
TIMESTAMP=$(date +%s)
SIGNATURE="t=${TIMESTAMP},v1=$(echo -n "${TIMESTAMP}.$(cat test_webhook.json)" | openssl dgst -sha256 -hmac "$STRIPE_WEBHOOK_SECRET" -binary | openssl base64)"

curl -X POST http://localhost:54321/functions/v1/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "stripe-signature: $SIGNATURE" \
  -d @test_webhook.json
```

## Event Types Handled

- `invoice.payment_succeeded` - Payment completed successfully
- `invoice.payment_failed` - Payment failed
- `customer.subscription.deleted` - Subscription was cancelled
- `customer.subscription.updated` - Subscription was modified

## Database Schema

The function requires the `webhook_events` table for idempotency:

```sql
CREATE TABLE webhook_events (
    id SERIAL PRIMARY KEY,
    stripe_event_id VARCHAR(255) UNIQUE NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    processing_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    error_message TEXT,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Monitoring

Check the function logs in Supabase Dashboard:
1. Go to Edge Functions
2. Select `stripe-webhook`
3. View logs for debugging

## Security Features

- **Signature Validation**: All webhook requests are validated using Stripe's signature verification
- **Idempotency**: Events are tracked to prevent duplicate processing
- **CORS Protection**: Proper CORS headers configured
- **Error Handling**: Comprehensive error logging and handling

## Deployment

Deploy to Supabase:
```bash
npx supabase functions deploy stripe-webhook
```

Configure webhook endpoint in Stripe Dashboard:
1. Go to Developers → Webhooks
2. Add endpoint: `https://your-project.supabase.co/functions/v1/stripe-webhook`
3. Select events to send
4. Copy webhook secret to environment variables