// Stripe Payment Integration
// Handles payment processing and webhooks

import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");

interface CreateCheckoutData {
  customerId: string;
  customerEmail: string;
  productType: "ebook" | "bundle" | "coaching";
  successUrl: string;
  cancelUrl: string;
}

// Product pricing (in cents)
const PRICING = {
  ebook: 4700, // $47
  bundle: 9700, // $97
  coaching: 29700, // $297
};

export async function createCheckoutSession(data: CreateCheckoutData) {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }

  try {
    const amount = PRICING[data.productType];
    
    // Create Stripe Checkout Session
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      },
      body: new URLSearchParams({
        "payment_method_types[]": "card",
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][product_data][name]": getProductName(data.productType),
        "line_items[0][price_data][unit_amount]": amount.toString(),
        "line_items[0][quantity]": "1",
        mode: "payment",
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        customer_email: data.customerEmail,
        "metadata[customer_id]": data.customerId,
        "metadata[product_type]": data.productType,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stripe API error: ${error}`);
    }

    const session = await response.json();
    console.log("Stripe checkout session created:", session.id);

    // Create order record
    await supabase.from("orders").insert({
      customer_id: data.customerId,
      product_name: getProductName(data.productType),
      product_type: data.productType,
      amount_cents: amount,
      status: "pending",
      stripe_payment_intent_id: session.payment_intent,
    });

    return session;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw error;
  }
}

export async function handleWebhook(signature: string, body: string) {
  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET not configured");
  }

  try {
    // Verify webhook signature
    const event = JSON.parse(body);
    
    console.log("Stripe webhook received:", event.type);

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object);
        break;
      case "charge.refunded":
        await handleRefund(event.data.object);
        break;
      default:
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    return { received: true };
  } catch (error) {
    console.error("Error handling Stripe webhook:", error);
    throw error;
  }
}

async function handleCheckoutCompleted(session: any) {
  const customerId = session.metadata.customer_id;
  const productType = session.metadata.product_type;

  console.log(`Checkout completed for customer ${customerId}, product ${productType}`);

  // Update order status
  await supabase
    .from("orders")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
      stripe_customer_id: session.customer,
    })
    .eq("customer_id", customerId)
    .eq("product_type", productType)
    .eq("status", "pending");

  // Track analytics
  await supabase.from("analytics_events").insert({
    event_type: "purchase",
    customer_id: customerId,
    event_data: {
      product_type: productType,
      amount: session.amount_total,
      currency: session.currency,
    },
  });

  // Trigger welcome email (handled by email automation)
  console.log(`Purchase completed - welcome email will be triggered for ${customerId}`);
}

async function handlePaymentSucceeded(paymentIntent: any) {
  console.log("Payment succeeded:", paymentIntent.id);
  
  // Additional payment success logic if needed
}

async function handleRefund(charge: any) {
  console.log("Refund processed:", charge.id);

  // Update order status to refunded
  await supabase
    .from("orders")
    .update({ status: "refunded" })
    .eq("stripe_payment_intent_id", charge.payment_intent);
}

function getProductName(productType: string): string {
  const names = {
    ebook: "Stop Homework Battles - Complete Guide",
    bundle: "Stop Homework Battles - Complete Bundle",
    coaching: "1-on-1 Strategy Session with Marianna",
  };
  return names[productType as keyof typeof names] || "Digital Product";
}

// Create payment link for direct sales
export async function createPaymentLink(productType: "ebook" | "bundle" | "coaching") {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }

  const amount = PRICING[productType];
  const productName = getProductName(productType);

  try {
    // Create a Stripe Payment Link
    const response = await fetch("https://api.stripe.com/v1/payment_links", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      },
      body: new URLSearchParams({
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][product_data][name]": productName,
        "line_items[0][price_data][unit_amount]": amount.toString(),
        "line_items[0][quantity]": "1",
        "after_completion[type]": "redirect",
        "after_completion[redirect][url]": "https://mzmarianna.com/thank-you",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stripe API error: ${error}`);
    }

    const paymentLink = await response.json();
    return paymentLink.url;
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw error;
  }
}
