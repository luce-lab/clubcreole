// Supabase Edge Function: create-subscription
// Creates a Stripe subscription with incomplete payment for mobile Payment Sheet
// Returns client_secret for flutter_stripe SDK

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);

    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Parse request body
    const { price_id } = await req.json();
    if (!price_id) throw new Error("Missing price_id");
    logStep("Received price_id", { price_id });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if user already has an active subscription
    const { data: existingSubscriber } = await supabaseClient
      .from('subscribers')
      .select('*')
      .eq('email', user.email)
      .eq('subscribed', true)
      .single();

    if (existingSubscriber) {
      throw new Error("User already has an active subscription");
    }

    // Get or create Stripe customer
    let customerId: string;
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });

      // Update or create subscriber with Stripe customer ID
      await supabaseClient
        .from('subscribers')
        .upsert({
          email: user.email,
          stripe_customer_id: customerId,
          subscribed: false,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'email' });
    }

    // Create subscription with incomplete payment (for Payment Sheet)
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: price_id }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: { supabase_user_id: user.id },
    });

    logStep("Subscription created", { subscriptionId: subscription.id });

    // Get client secret from payment intent
    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    if (!paymentIntent?.client_secret) {
      throw new Error("Failed to get payment intent client secret");
    }

    logStep("Payment intent ready", {
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status
    });

    return new Response(
      JSON.stringify({
        subscription_id: subscription.id,
        customer_id: customerId,
        client_secret: paymentIntent.client_secret,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
