import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-DONATION-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { priceId, donorEmail, donorPhone, donationType, customAmountCents, currency } = await req.json();
    
    if ((!priceId && !customAmountCents) || !donorEmail || !donationType) {
      throw new Error("Missing required fields: donorEmail, donationType, and either priceId or customAmountCents");
    }

    logStep("Request validated", { priceId, donorEmail, donationType });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Resolve amount and currency
    let amountUsd = 0;
    let chargeCurrency = 'usd';
    let checkoutLineItem: Stripe.Checkout.SessionCreateParams.LineItem = { quantity: 1, price: '' } as any;

    if (customAmountCents && customAmountCents > 0) {
      amountUsd = customAmountCents / 100;
      chargeCurrency = (currency || 'USD').toLowerCase();
      checkoutLineItem = {
        quantity: 1,
        price_data: {
          currency: chargeCurrency,
          product_data: {
            name: `Custom Donation (${donationType})`,
          },
          unit_amount: customAmountCents,
        },
      };
      logStep("Using custom amount", { amountUsd, chargeCurrency });
    } else if (priceId) {
      const price = await stripe.prices.retrieve(priceId);
      amountUsd = price.unit_amount! / 100;
      chargeCurrency = price.currency;
      checkoutLineItem = { quantity: 1, price: priceId } as any;
      logStep("Using preset price", { amountUsd, currency: chargeCurrency });
    }

    // Generate a unique tracking ID
    const trackingId = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create donation record
    const { data: donation, error: donationError } = await supabase
      .from('donations')
      .insert({
        amount: amountUsd,
        donation_type: donationType,
        status: 'pending',
        donor_email: donorEmail,
        donor_phone: donorPhone,
        currency: chargeCurrency.toUpperCase(),
        order_tracking_id: trackingId,
        invoice_id: trackingId, // Using tracking ID as invoice ID for now
      })
      .select()
      .single();

    if (donationError) {
      throw new Error(`Failed to create donation record: ${donationError.message}`);
    }

    logStep("Donation record created", { donationId: donation.id, trackingId });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: donorEmail,
      line_items: [
        checkoutLineItem,
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/donation-success?tracking_id=${trackingId}`,
      cancel_url: `${req.headers.get("origin")}/donate?canceled=true`,
      metadata: {
        donation_id: donation.id,
        tracking_id: trackingId,
        donation_type: donationType,
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ 
      url: session.url,
      tracking_id: trackingId,
      donation_id: donation.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});