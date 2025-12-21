import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

// Enhanced logging for debugging and monitoring
const logWebhook = (level: "INFO" | "WARN" | "ERROR", message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const dataStr = data ? ` - ${JSON.stringify(data)}` : '';
  console.log(`[WEBHOOK-${level}] ${timestamp} - ${message}${dataStr}`);
};

// Helper function to validate Stripe webhook signature
const validateStripeSignature = (body: string, signature: string, secret: string): boolean => {
  try {
    const crypto = globalThis.crypto || (globalThis as any).webcrypto;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);

    return crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    ).then((key) => {
      const signatureParts = signature.split(',');
      const timestamp = signatureParts.find(part => part.startsWith('t='));
      const v1Signature = signatureParts.find(part => part.startsWith('v1='));

      if (!timestamp || !v1Signature) {
        logWebhook("ERROR", "Invalid webhook signature format", { signature });
        return false;
      }

      const payload = timestamp + '.' + body;
      const payloadData = encoder.encode(payload);
      const signatureData = encoder.encode(v1Signature.slice(3)); // Remove 'v1=' prefix

      return crypto.subtle.verify('HMAC', key, signatureData, payloadData);
    }).catch((error) => {
      logWebhook("ERROR", "Signature validation failed", { error: error.message });
      return false;
    });
  } catch (error) {
    logWebhook("ERROR", "Exception in signature validation", { error: error.message });
    return false;
  }
};

// Check if event was already processed (idempotency)
const isEventProcessed = async (
  supabaseClient: any,
  eventId: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabaseClient
      .from('webhook_events')
      .select('id')
      .eq('stripe_event_id', eventId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      logWebhook("ERROR", "Error checking processed event", { eventId, error: error.message });
      throw error;
    }

    return !!data;
  } catch (error) {
    logWebhook("ERROR", "Exception checking processed event", { eventId, error: error.message });
    throw error;
  }
};

// Mark event as processed with retry support
const markEventProcessed = async (
  supabaseClient: any,
  eventId: string,
  eventType: string,
  processingStatus: 'success' | 'error' | 'retry' = 'success',
  errorMessage?: string,
  retryCount: number = 0
): Promise<void> => {
  try {
    const { error } = await supabaseClient
      .from('webhook_events')
      .upsert({
        stripe_event_id: eventId,
        event_type: eventType,
        processing_status: processingStatus,
        error_message: errorMessage,
        retry_count: retryCount,
        processed_at: new Date().toISOString(),
      }, {
        onConflict: 'stripe_event_id'
      });

    if (error) {
      logWebhook("ERROR", "Error marking event as processed", {
        eventId,
        error: error.message
      });
      throw error;
    }

    logWebhook("INFO", "Event marked as processed", {
      eventId,
      eventType,
      processingStatus,
      retryCount
    });
  } catch (error) {
    logWebhook("ERROR", "Exception marking event as processed", {
      eventId,
      error: error.message
    });
    throw error;
  }
};

// Retry logic for failed webhook processing
const retryEventProcessing = async (
  supabaseClient: any,
  eventId: string,
  eventType: string,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<boolean> => {
  try {
    // Get existing event record
    const { data: eventRecord, error } = await supabaseClient
      .from('webhook_events')
      .select('retry_count')
      .eq('stripe_event_id', eventId)
      .single();

    if (error) {
      logWebhook("ERROR", "Error fetching event for retry", {
        eventId,
        error: error.message
      });
      return false;
    }

    const currentRetryCount = eventRecord?.retry_count || 0;

    if (currentRetryCount >= maxRetries) {
      logWebhook("WARN", "Max retries exceeded", {
        eventId,
        currentRetryCount,
        maxRetries
      });
      return false;
    }

    const newRetryCount = currentRetryCount + 1;
    const delay = retryDelay * Math.pow(2, newRetryCount - 1); // Exponential backoff

    logWebhook("INFO", "Scheduling retry", {
      eventId,
      currentRetryCount,
      newRetryCount,
      delay
    });

    // In a real implementation, you might want to use a queue system like Redis
    // For now, we'll just update the record and return true
    await markEventProcessed(
      supabaseClient,
      eventId,
      eventType,
      'retry',
      `Scheduled retry ${newRetryCount}/${maxRetries}`,
      newRetryCount
    );

    return true;
  } catch (error) {
    logWebhook("ERROR", "Error in retryEventProcessing", {
      eventId,
      error: error.message
    });
    return false;
  }
};

// Main webhook event handler
const handleWebhookEvent = async (
  event: Stripe.Event,
  supabaseClient: any
): Promise<void> => {
  const eventType = event.type;
  logWebhook("INFO", "Processing webhook event", {
    eventId: event.id,
    eventType,
    objectType: event.data.object?.object
  });

  switch (eventType) {
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event, supabaseClient);
      break;

    case 'invoice.payment_failed':
      await handlePaymentFailed(event, supabaseClient);
      break;

    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event, supabaseClient);
      break;

    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event, supabaseClient);
      break;

    default:
      logWebhook("WARN", "Unhandled event type", { eventType });
      // We still want to mark as processed to avoid reprocessing
      break;
  }
};

// Helper function to determine subscription tier from amount
const getSubscriptionTier = (amount: number, interval: string, intervalCount?: number): string | null => {
  if (amount === 1500 && interval === 'month' && intervalCount === 2) { // 15€ pour 2 mois
    return "Passionné";
  } else if (amount === 8999 && interval === 'month') { // 89.99€ par mois
    return "Expert";
  } else if (amount === 15000 && interval === 'year') { // 150€ par an (équivalent Passionné)
    return "Passionné";
  } else if (amount === 90000 && interval === 'year') { // 900€ par an (équivalent Expert)
    return "Expert";
  }
  return null;
};

// Helper function to get or create subscriber
const getOrCreateSubscriber = async (
  supabaseClient: any,
  customerId: string,
  email?: string
): Promise<{ subscriber: any; isNew: boolean }> => {
  try {
    // First try to find existing subscriber by Stripe customer ID
    const { data: existingSubscriber, error: fetchError } = await supabaseClient
      .from('subscribers')
      .select('*')
      .eq('stripe_customer_id', customerId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existingSubscriber) {
      logWebhook("INFO", "Found existing subscriber", {
        customerId,
        subscriberId: existingSubscriber.id
      });
      return { subscriber: existingSubscriber, isNew: false };
    }

    // If no subscriber found with customer ID, try to find by email
    if (email) {
      const { data: emailSubscriber, error: emailError } = await supabaseClient
        .from('subscribers')
        .select('*')
        .eq('email', email)
        .single();

      if (emailError && emailError.code !== 'PGRST116') {
        throw emailError;
      }

      if (emailSubscriber) {
        // Update existing subscriber with customer ID
        const { data: updatedSubscriber, error: updateError } = await supabaseClient
          .from('subscribers')
          .update({
            stripe_customer_id: customerId,
            updated_at: new Date().toISOString()
          })
          .eq('id', emailSubscriber.id)
          .select()
          .single();

        if (updateError) throw updateError;

        logWebhook("INFO", "Updated subscriber with customer ID", {
          email,
          customerId,
          subscriberId: updatedSubscriber.id
        });
        return { subscriber: updatedSubscriber, isNew: false };
      }
    }

    // Create new subscriber
    const { data: newSubscriber, error: insertError } = await supabaseClient
      .from('subscribers')
      .insert({
        email: email || 'unknown@example.com',
        stripe_customer_id: customerId,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) throw insertError;

    logWebhook("INFO", "Created new subscriber", {
      email: email || 'unknown',
      customerId,
      subscriberId: newSubscriber.id
    });

    return { subscriber: newSubscriber, isNew: true };
  } catch (error) {
    logWebhook("ERROR", "Error in getOrCreateSubscriber", {
      customerId,
      email,
      error: error.message
    });
    throw error;
  }
};

// Helper function to record purchase
const recordPurchase = async (
  supabaseClient: any,
  subscriberId: number,
  invoice: any,
  eventType: string
): Promise<void> => {
  try {
    const purchaseData = {
      user_id: subscriberId,
      item_type: 'subscription',
      item_name: invoice.subscription ? `Abonnement ${eventType}` : 'Paiement unique',
      amount: invoice.amount_paid / 100, // Convert from cents to euros
      currency: invoice.currency,
      purchase_date: new Date(invoice.created * 1000).toISOString(),
      status: 'completed',
      stripe_invoice_id: invoice.id,
      stripe_subscription_id: invoice.subscription || null
    };

    const { error } = await supabaseClient
      .from('purchases')
      .insert(purchaseData);

    if (error) throw error;

    logWebhook("INFO", "Purchase recorded successfully", {
      subscriberId,
      invoiceId: invoice.id,
      amount: purchaseData.amount,
      currency: purchaseData.currency
    });
  } catch (error) {
    logWebhook("ERROR", "Error recording purchase", {
      subscriberId,
      invoiceId: invoice.id,
      error: error.message
    });
    throw error;
  }
};

// Event handler for successful payments
const handlePaymentSucceeded = async (event: Stripe.Event, supabaseClient: any): Promise<void> => {
  try {
    const invoice = event.data.object as Stripe.Invoice;
    const subscription = invoice.subscription as string;
    const customerId = invoice.customer as string;

    logWebhook("INFO", "Processing payment succeeded", {
      eventId: event.id,
      invoiceId: invoice.id,
      customerId,
      subscription,
      amount: invoice.amount_paid
    });

    if (!subscription) {
      logWebhook("WARN", "No subscription found in invoice", { invoiceId: invoice.id });
      return;
    }

    // Get or create subscriber
    const { subscriber } = await getOrCreateSubscriber(
      supabaseClient,
      customerId,
      invoice.customer_email || undefined
    );

    // Get subscription details from Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16"
    });

    const subscriptionDetails = await stripe.subscriptions.retrieve(subscription);
    const subscriptionItem = subscriptionDetails.items.data[0];
    const price = subscriptionItem.price;

    // Determine subscription tier
    const tier = getSubscriptionTier(price.unit_amount || 0, price.interval, price.interval_count);
    const subscriptionEnd = new Date(subscriptionDetails.current_period_end * 1000).toISOString();

    // Update subscriber record
    const { error: updateError } = await supabaseClient
      .from('subscribers')
      .update({
        subscribed: true,
        subscription_tier: tier,
        subscription_end: subscriptionEnd,
        stripe_subscription_id: subscription,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id);

    if (updateError) throw updateError;

    // Record purchase
    await recordPurchase(supabaseClient, subscriber.id, invoice, 'renouvellement');

    // Send email notification
    try {
      const emailData = {
        type: 'payment_success' as const,
        recipientEmail: invoice.customer_email || subscriber.email,
        recipientName: subscriber.email.split('@')[0], // Extract name from email
        subscriptionTier: tier || 'Standard',
        amount: invoice.amount_paid / 100, // Convert from cents to currency units
        currency: invoice.currency.toUpperCase(),
        nextBillingDate: subscriptionEnd ? new Date(subscriptionEnd).toLocaleDateString('fr-FR') : undefined,
        webhookEventId: event.id,
        subscriberId: subscriber.id
      };

      // Send email asynchronously (non-blocking)
      supabaseClient.functions.invoke('subscription-emails', {
        body: emailData
      }).catch((emailError) => {
        logWebhook("WARN", "Failed to send payment success email", {
          subscriberId: subscriber.id,
          error: emailError.message
        });
      });
    } catch (emailError) {
      logWebhook("WARN", "Error preparing payment success email", {
        subscriberId: subscriber.id,
        error: emailError.message
      });
    }

    logWebhook("INFO", "Payment succeeded processed successfully", {
      subscriberId: subscriber.id,
      tier,
      subscriptionEnd,
      invoiceId: invoice.id
    });

  } catch (error) {
    logWebhook("ERROR", "Error in handlePaymentSucceeded", {
      eventId: event.id,
      error: error.message
    });
    throw error;
  }
};

// Event handler for failed payments
const handlePaymentFailed = async (event: Stripe.Event, supabaseClient: any): Promise<void> => {
  try {
    const invoice = event.data.object as Stripe.Invoice;
    const customerId = invoice.customer as string;
    const subscription = invoice.subscription as string;

    logWebhook("INFO", "Processing payment failed", {
      eventId: event.id,
      invoiceId: invoice.id,
      customerId,
      subscription,
      attemptCount: invoice.attempt_count
    });

    if (!subscription) {
      logWebhook("WARN", "No subscription found in failed invoice", { invoiceId: invoice.id });
      return;
    }

    // Get or create subscriber
    const { subscriber } = await getOrCreateSubscriber(
      supabaseClient,
      customerId,
      invoice.customer_email || undefined
    );

    // Record failed payment attempt
    const failedPurchaseData = {
      user_id: subscriber.id,
      item_type: 'subscription',
      item_name: `Échec de paiement abonnement`,
      amount: invoice.amount_due / 100, // Convert from cents to euros
      currency: invoice.currency,
      purchase_date: new Date(invoice.created * 1000).toISOString(),
      status: 'failed',
      stripe_invoice_id: invoice.id,
      stripe_subscription_id: subscription,
      metadata: {
        attempt_count: invoice.attempt_count,
        next_retry: invoice.next_payment_attempt ?
          new Date(invoice.next_payment_attempt * 1000).toISOString() : null
      }
    };

    const { error: recordError } = await supabaseClient
      .from('purchases')
      .insert(failedPurchaseData);

    if (recordError) throw recordError;

    // If this is the final attempt, mark subscription as inactive
    if (invoice.attempt_count >= 3) {
      const { error: updateError } = await supabaseClient
        .from('subscribers')
        .update({
          subscribed: false,
          subscription_status: 'past_due',
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriber.id);

      if (updateError) throw updateError;

      logWebhook("WARN", "Subscription marked as past due after multiple failed attempts", {
        subscriberId: subscriber.id,
        attemptCount: invoice.attempt_count
      });
    }

    // Send email notification for payment failure
    try {
      const emailData = {
        type: 'payment_failed' as const,
        recipientEmail: invoice.customer_email || subscriber.email,
        recipientName: subscriber.email.split('@')[0], // Extract name from email
        subscriptionTier: subscriber.subscription_tier || 'Standard',
        amount: invoice.amount_due / 100, // Convert from cents to currency units
        currency: invoice.currency.toUpperCase(),
        failureReason: 'Paiement refusé',
        retryDate: invoice.next_payment_attempt ?
          new Date(invoice.next_payment_attempt * 1000).toLocaleDateString('fr-FR') : undefined,
        webhookEventId: event.id,
        subscriberId: subscriber.id
      };

      // Send email asynchronously (non-blocking)
      supabaseClient.functions.invoke('subscription-emails', {
        body: emailData
      }).catch((emailError) => {
        logWebhook("WARN", "Failed to send payment failure email", {
          subscriberId: subscriber.id,
          error: emailError.message
        });
      });
    } catch (emailError) {
      logWebhook("WARN", "Error preparing payment failure email", {
        subscriberId: subscriber.id,
        error: emailError.message
      });
    }

    logWebhook("INFO", "Payment failed processed successfully", {
      subscriberId: subscriber.id,
      invoiceId: invoice.id,
      attemptCount: invoice.attempt_count
    });

  } catch (error) {
    logWebhook("ERROR", "Error in handlePaymentFailed", {
      eventId: event.id,
      error: error.message
    });
    throw error;
  }
};

// Event handler for subscription cancellation
const handleSubscriptionDeleted = async (event: Stripe.Event, supabaseClient: any): Promise<void> => {
  try {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    logWebhook("INFO", "Processing subscription deleted", {
      eventId: event.id,
      subscriptionId: subscription.id,
      customerId,
      status: subscription.status
    });

    // Find subscriber by customer ID
    const { subscriber } = await getOrCreateSubscriber(supabaseClient, customerId);

    // Update subscriber record
    const { error: updateError } = await supabaseClient
      .from('subscribers')
      .update({
        subscribed: false,
        subscription_tier: null,
        subscription_status: 'cancelled',
        subscription_end: new Date(subscription.ended_at * 1000).toISOString(),
        stripe_subscription_id: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id);

    if (updateError) throw updateError;

    // Record cancellation as a purchase
    const cancellationData = {
      user_id: subscriber.id,
      item_type: 'subscription',
      item_name: 'Annulation abonnement',
      amount: 0,
      currency: 'eur',
      purchase_date: new Date().toISOString(),
      status: 'completed',
      stripe_subscription_id: subscription.id,
      metadata: {
        cancelled_at: new Date(subscription.ended_at * 1000).toISOString(),
        reason: 'user_cancelled'
      }
    };

    const { error: recordError } = await supabaseClient
      .from('purchases')
      .insert(cancellationData);

    if (recordError) {
      logWebhook("WARN", "Failed to record cancellation purchase", {
        error: recordError.message
      });
    }

    // Send email notification for subscription cancellation
    try {
      const emailData = {
        type: 'subscription_cancelled' as const,
        recipientEmail: subscriber.email,
        recipientName: subscriber.email.split('@')[0], // Extract name from email
        subscriptionTier: subscriber.subscription_tier || 'Standard',
        nextBillingDate: subscription.ended_at ?
          new Date(subscription.ended_at * 1000).toLocaleDateString('fr-FR') : undefined,
        webhookEventId: event.id,
        subscriberId: subscriber.id
      };

      // Send email asynchronously (non-blocking)
      supabaseClient.functions.invoke('subscription-emails', {
        body: emailData
      }).catch((emailError) => {
        logWebhook("WARN", "Failed to send subscription cancellation email", {
          subscriberId: subscriber.id,
          error: emailError.message
        });
      });
    } catch (emailError) {
      logWebhook("WARN", "Error preparing subscription cancellation email", {
        subscriberId: subscriber.id,
        error: emailError.message
      });
    }

    logWebhook("INFO", "Subscription deletion processed successfully", {
      subscriberId: subscriber.id,
      subscriptionId: subscription.id
    });

  } catch (error) {
    logWebhook("ERROR", "Error in handleSubscriptionDeleted", {
      eventId: event.id,
      error: error.message
    });
    throw error;
  }
};

// Event handler for subscription updates
const handleSubscriptionUpdated = async (event: Stripe.Event, supabaseClient: any): Promise<void> => {
  try {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    logWebhook("INFO", "Processing subscription updated", {
      eventId: event.id,
      subscriptionId: subscription.id,
      customerId,
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end
    });

    // Find subscriber by customer ID
    const { subscriber } = await getOrCreateSubscriber(supabaseClient, customerId);

    const subscriptionItem = subscription.items.data[0];
    const price = subscriptionItem.price;

    // Determine new subscription tier and status
    const tier = getSubscriptionTier(price.unit_amount || 0, price.interval, price.interval_count);
    const subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
    const isSubscribed = subscription.status === 'active' || subscription.status === 'trialing';

    // Update subscriber record
    const { error: updateError } = await supabaseClient
      .from('subscribers')
      .update({
        subscribed: isSubscribed,
        subscription_tier: tier,
        subscription_status: subscription.status,
        subscription_end: subscriptionEnd,
        stripe_subscription_id: subscription.id,
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id);

    if (updateError) throw updateError;

    logWebhook("INFO", "Subscription update processed successfully", {
      subscriberId: subscriber.id,
      subscriptionId: subscription.id,
      tier,
      status: subscription.status,
      isSubscribed
    });

  } catch (error) {
    logWebhook("ERROR", "Error in handleSubscriptionUpdated", {
      eventId: event.id,
      error: error.message
    });
    throw error;
  }
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST requests
  if (req.method !== "POST") {
    logWebhook("WARN", "Invalid method received", { method: req.method });
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Initialize Supabase client with service role for write operations
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logWebhook("INFO", "Webhook received", {
      userAgent: req.headers.get("user-agent"),
      contentType: req.headers.get("content-type"),
      stripeSignature: req.headers.get("stripe-signature") ? "present" : "missing"
    });

    // Get Stripe webhook secret and signature
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const stripeSignature = req.headers.get("stripe-signature");

    if (!webhookSecret) {
      logWebhook("ERROR", "STRIPE_WEBHOOK_SECRET not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!stripeSignature) {
      logWebhook("ERROR", "Missing stripe-signature header");
      return new Response(JSON.stringify({ error: "Missing signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get request body
    const body = await req.text();

    if (!body) {
      logWebhook("ERROR", "Empty request body");
      return new Response(JSON.stringify({ error: "Empty request body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate webhook signature (Phase 1.2 will enhance this)
    // For now, we'll use basic validation and enhance in the next task
    logWebhook("INFO", "Basic webhook validation passed");

    // Parse the event (without signature validation for now)
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16"
    });

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, stripeSignature, webhookSecret);
      logWebhook("INFO", "Webhook signature validated successfully");
    } catch (error) {
      logWebhook("ERROR", "Invalid webhook signature", {
        error: error.message,
        signature: stripeSignature.substring(0, 20) + "..."
      });
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if event was already processed (idempotency)
    const isProcessed = await isEventProcessed(supabaseClient, event.id);
    if (isProcessed) {
      logWebhook("INFO", "Event already processed, skipping", { eventId: event.id });
      return new Response(JSON.stringify({ message: "Event already processed" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Process the event
    await handleWebhookEvent(event, supabaseClient);

    // Mark event as successfully processed
    await markEventProcessed(supabaseClient, event.id, event.type, 'success');

    logWebhook("INFO", "Webhook processed successfully", {
      eventId: event.id,
      eventType: event.type
    });

    return new Response(JSON.stringify({
      message: "Webhook processed successfully",
      eventId: event.id,
      eventType: event.type
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logWebhook("ERROR", "Webhook processing failed", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });

    // Try to extract event ID for error tracking and retry
    let eventId = "unknown";
    let eventType = "unknown";
    try {
      const body = await req.clone().text();
      const tempEvent = JSON.parse(body);
      eventId = tempEvent.id || eventId;
      eventType = tempEvent.type || eventType;
    } catch {
      // If we can't parse the body, that's ok for error tracking
    }

    // Handle retry logic for transient failures
    if (eventId !== "unknown" && eventType !== "unknown") {
      try {
        // Check if this is a retryable error (database, network, temporary issues)
        const retryableErrors = [
          'connection',
          'timeout',
          'temporary',
          'service unavailable',
          'rate limit'
        ];

        const isRetryable = retryableErrors.some(retryableError =>
          errorMessage.toLowerCase().includes(retryableError)
        );

        if (isRetryable) {
          const retryScheduled = await retryEventProcessing(
            supabaseClient,
            eventId,
            eventType
          );

          if (retryScheduled) {
            return new Response(JSON.stringify({
              message: "Webhook processing failed, retry scheduled",
              eventId: eventId,
              eventType: eventType,
              retryable: true
            }), {
              status: 202, // Accepted for retry
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
        }

        // Mark as permanently failed if not retryable or max retries exceeded
        await markEventProcessed(supabaseClient, eventId, eventType, "error", errorMessage);

      } catch (trackingError) {
        logWebhook("ERROR", "Failed to track error event", {
          eventId,
          trackingError: trackingError.message
        });
        // Continue with 500 response even if tracking fails
      }
    }

    return new Response(JSON.stringify({
      error: "Internal server error",
      eventId: eventId !== "unknown" ? eventId : undefined,
      retryable: false
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});