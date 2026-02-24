import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import * as resend from "./resend.tsx";
import * as stripe from "./stripe.tsx";
import * as canva from "./canva.tsx";
import { generateContent, generate30DayCalendar } from "./ai-content-generator.tsx";
import { createCanvaDesign, createDesignsForCalendar } from "./canva-design-engine.tsx";

const app = new Hono();

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-14f75f49/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================
// CUSTOMER & QUIZ ENDPOINTS
// ============================================

// Create or update customer
app.post("/make-server-14f75f49/customers", async (c) => {
  try {
    const { email, name, quiz_results, quiz_score } = await c.req.json();

    // Check if customer exists
    const { data: existing } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .single();

    let customer;
    if (existing) {
      // Update existing customer
      const { data } = await supabase
        .from("customers")
        .update({ name, quiz_results, quiz_score, last_active: new Date().toISOString() })
        .eq("email", email)
        .select()
        .single();
      customer = data;
    } else {
      // Create new customer
      const { data } = await supabase
        .from("customers")
        .insert({ email, name, quiz_results, quiz_score })
        .select()
        .single();
      customer = data;

      // Track analytics
      await supabase.from("analytics_events").insert({
        event_type: "customer_created",
        customer_id: customer.id,
        event_data: { email, quiz_score },
      });
    }

    return c.json({ success: true, customer });
  } catch (error: any) {
    console.error("Error creating/updating customer:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Submit quiz and send result email
app.post("/make-server-14f75f49/quiz/submit", async (c) => {
  try {
    const { email, name, responses } = await c.req.json();

    // Calculate quiz result
    const result = calculateQuizResult(responses);

    // Create/update customer with quiz results
    const { data: customer } = await supabase
      .from("customers")
      .upsert(
        {
          email,
          name,
          quiz_results: responses,
          quiz_score: result.scaffoldType,
          last_active: new Date().toISOString(),
        },
        { onConflict: "email" }
      )
      .select()
      .single();

    // Save quiz response
    await supabase.from("quiz_responses").insert({
      customer_id: customer.id,
      responses: responses,
      result_type: result.scaffoldType,
    });

    // Track analytics
    await supabase.from("analytics_events").insert({
      event_type: "quiz_complete",
      customer_id: customer.id,
      event_data: { result: result.scaffoldType },
    });

    // Send quiz result email with Resend
    const emailTemplate = resend.EMAIL_TEMPLATES.quiz_result(
      name,
      result.scaffoldType,
      `https://mzmarianna.com/checkout?scaffold=${result.scaffoldType}`
    );

    await resend.sendEmail({
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      customerId: customer.id,
      sequenceType: "quiz_result",
      emailNumber: 1,
    });

    // Generate quiz result graphic with Canva (async, don't wait)
    canva.generateQuizResultGraphic(name, result.scaffoldType, customer.id).catch((err) => {
      console.error("Error generating quiz graphic:", err);
    });

    return c.json({ success: true, result, customerId: customer.id });
  } catch (error: any) {
    console.error("Error submitting quiz:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================
// STRIPE PAYMENT ENDPOINTS
// ============================================

// Create Stripe checkout session
app.post("/make-server-14f75f49/checkout/create", async (c) => {
  try {
    const { customerId, customerEmail, productType, successUrl, cancelUrl } = await c.req.json();

    const session = await stripe.createCheckoutSession({
      customerId,
      customerEmail,
      productType,
      successUrl: successUrl || "https://mzmarianna.com/thank-you",
      cancelUrl: cancelUrl || "https://mzmarianna.com/checkout",
    });

    return c.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Stripe webhook handler
app.post("/make-server-14f75f49/webhooks/stripe", async (c) => {
  try {
    const signature = c.req.header("stripe-signature") || "";
    const body = await c.req.text();

    await stripe.handleWebhook(signature, body);

    return c.json({ received: true });
  } catch (error: any) {
    console.error("Error handling Stripe webhook:", error);
    return c.json({ success: false, error: error.message }, 400);
  }
});

// ============================================
// EMAIL AUTOMATION ENDPOINTS
// ============================================

// Send email (manual or triggered)
app.post("/make-server-14f75f49/emails/send", async (c) => {
  try {
    const { to, subject, html, customerId, sequenceType, emailNumber } = await c.req.json();

    const result = await resend.sendEmail({
      to,
      subject,
      html,
      customerId,
      sequenceType,
      emailNumber,
    });

    return c.json({ success: true, emailId: result.id });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Send welcome email after purchase
app.post("/make-server-14f75f49/emails/welcome", async (c) => {
  try {
    const { customerId } = await c.req.json();

    const { data: customer } = await supabase
      .from("customers")
      .select("*")
      .eq("id", customerId)
      .single();

    if (!customer) {
      return c.json({ success: false, error: "Customer not found" }, 404);
    }

    const emailTemplate = resend.EMAIL_TEMPLATES.welcome(
      customer.name || "there",
      "https://mzmarianna.com/portal"
    );

    await resend.sendEmail({
      to: customer.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      customerId: customer.id,
      sequenceType: "purchase",
      emailNumber: 1,
    });

    return c.json({ success: true });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================
// CANVA CONTENT GENERATION ENDPOINTS
// ============================================

// Generate social media content
app.post("/make-server-14f75f49/content/generate", async (c) => {
  try {
    const { contentType, data } = await c.req.json();

    const result = await canva.generateContent({
      contentType,
      data,
    });

    return c.json({ success: true, content: result });
  } catch (error: any) {
    console.error("Error generating content:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Generate social media campaign
app.post("/make-server-14f75f49/content/campaign", async (c) => {
  try {
    const { theme, postCount } = await c.req.json();

    const posts = await canva.generateSocialMediaCampaign(theme, postCount || 7);

    return c.json({ success: true, posts });
  } catch (error: any) {
    console.error("Error generating campaign:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================
// ANALYTICS ENDPOINTS
// ============================================

// Get dashboard analytics
app.get("/make-server-14f75f49/analytics/dashboard", async (c) => {
  try {
    // Get total customers
    const { count: totalCustomers } = await supabase
      .from("customers")
      .select("*", { count: "exact", head: true });

    // Get total orders and revenue
    const { data: orders } = await supabase
      .from("orders")
      .select("amount_cents, status")
      .eq("status", "completed");

    const totalRevenue = orders?.reduce((sum, order) => sum + order.amount_cents, 0) || 0;
    const totalOrders = orders?.length || 0;

    // Get quiz completions
    const { count: quizCompletions } = await supabase
      .from("quiz_responses")
      .select("*", { count: "exact", head: true });

    // Get conversion rate
    const conversionRate = totalCustomers && quizCompletions
      ? ((totalOrders / quizCompletions) * 100).toFixed(2)
      : 0;

    // Get recent activity
    const { data: recentEvents } = await supabase
      .from("analytics_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    return c.json({
      success: true,
      data: {
        totalCustomers,
        totalOrders,
        totalRevenue: (totalRevenue / 100).toFixed(2), // Convert cents to dollars
        quizCompletions,
        conversionRate: `${conversionRate}%`,
        recentEvents,
      },
    });
  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Track custom analytics event
app.post("/make-server-14f75f49/analytics/track", async (c) => {
  try {
    const { eventType, customerId, eventData } = await c.req.json();

    await supabase.from("analytics_events").insert({
      event_type: eventType,
      customer_id: customerId,
      event_data: eventData || {},
    });

    return c.json({ success: true });
  } catch (error: any) {
    console.error("Error tracking event:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================
// API SETTINGS & MANAGEMENT
// ============================================

// Save API key to environment (stored in Supabase secrets)
app.post("/make-server-14f75f49/settings/api-key", async (c) => {
  try {
    const { keyName, value } = await c.req.json();
    
    // Validate key name
    const allowedKeys = [
      'CANVA_API_KEY',
      'META_ACCESS_TOKEN',
      'META_PAGE_ID',
      'META_INSTAGRAM_ACCOUNT_ID',
      'PINTEREST_ACCESS_TOKEN',
    ];
    
    if (!allowedKeys.includes(keyName)) {
      return c.json({ success: false, error: 'Invalid API key name' }, 400);
    }
    
    // Store in KV store (encrypted)
    await kv.set(`api_key_${keyName}`, value);
    
    return c.json({ 
      success: true, 
      message: `${keyName} saved successfully. Note: For production, add to Supabase Edge Function Secrets.` 
    });
  } catch (error: any) {
    console.error("Error saving API key:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Test API key connection
app.post("/make-server-14f75f49/settings/test-api-key", async (c) => {
  try {
    const { keyName } = await c.req.json();
    
    // Try to get from environment first, then KV store
    let apiKey = Deno.env.get(keyName);
    if (!apiKey) {
      apiKey = await kv.get(`api_key_${keyName}`);
    }
    
    if (!apiKey) {
      return c.json({ 
        success: false, 
        message: `${keyName} not found. Please save it first.` 
      });
    }
    
    // Test the specific API
    let testResult = { success: false, message: '' };
    
    switch (keyName) {
      case 'CANVA_API_KEY':
        testResult = await testCanvaApi(apiKey);
        break;
      case 'META_ACCESS_TOKEN':
        testResult = await testMetaApi(apiKey);
        break;
      case 'PINTEREST_ACCESS_TOKEN':
        testResult = await testPinterestApi(apiKey);
        break;
      default:
        testResult = { success: true, message: 'API key saved' };
    }
    
    return c.json(testResult);
  } catch (error: any) {
    console.error("Error testing API key:", error);
    return c.json({ success: false, message: error.message }, 500);
  }
});

// ============================================
// CANVA INTEGRATION
// ============================================

// Export design from Canva
app.post("/make-server-14f75f49/canva/export", async (c) => {
  try {
    const { designId } = await c.req.json();
    
    let apiKey = Deno.env.get('CANVA_API_KEY') || await kv.get('api_key_CANVA_API_KEY');
    
    if (!apiKey) {
      return c.json({ 
        success: false, 
        error: 'Canva API key not configured. Add it in Settings.' 
      }, 400);
    }
    
    // Export design from Canva
    const exportResponse = await fetch(
      `https://api.canva.com/v1/designs/${designId}/export`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          format: 'png',
          quality: 'high',
        }),
      }
    );
    
    if (!exportResponse.ok) {
      const errorData = await exportResponse.json();
      return c.json({ 
        success: false, 
        error: `Canva export failed: ${errorData.message || exportResponse.statusText}` 
      }, exportResponse.status);
    }
    
    const exportData = await exportResponse.json();
    
    // Save export metadata
    await kv.set(`canva_export_${designId}`, {
      exportUrl: exportData.export_url,
      exportedAt: new Date().toISOString(),
    });
    
    return c.json({
      success: true,
      exportUrl: exportData.export_url,
      designId: designId,
    });
  } catch (error: any) {
    console.error("Canva export error:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Publish to social media platforms
app.post("/make-server-14f75f49/social/publish", async (c) => {
  try {
    const { imageUrl, platforms, caption, scheduledFor } = await c.req.json();
    
    const results = [];
    
    // Facebook
    if (platforms.includes('facebook')) {
      const fbResult = await publishToFacebook(imageUrl, caption);
      results.push({ platform: 'facebook', ...fbResult });
    }
    
    // Instagram
    if (platforms.includes('instagram')) {
      const igResult = await publishToInstagram(imageUrl, caption);
      results.push({ platform: 'instagram', ...igResult });
    }
    
    // Pinterest
    if (platforms.includes('pinterest')) {
      const pinResult = await publishToPinterest(imageUrl, caption);
      results.push({ platform: 'pinterest', ...pinResult });
    }
    
    // Save to database
    await kv.set(`published_${Date.now()}`, {
      imageUrl,
      platforms,
      caption,
      results,
      publishedAt: new Date().toISOString(),
    });
    
    return c.json({
      success: true,
      results,
    });
  } catch (error: any) {
    console.error("Social publishing error:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Export from Canva and publish to social media (combined endpoint)
app.post("/make-server-14f75f49/canva/export-and-publish", async (c) => {
  try {
    const { designId, platforms, caption } = await c.req.json();
    
    // Step 1: Export from Canva
    const exportResponse = await fetch(
      `${c.req.url.split('/canva')[0]}/canva/export`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': c.req.header('Authorization') || '',
        },
        body: JSON.stringify({ designId }),
      }
    );
    
    const exportData = await exportResponse.json();
    
    if (!exportData.success) {
      return c.json(exportData, 500);
    }
    
    // Step 2: Publish to social media
    const publishResponse = await fetch(
      `${c.req.url.split('/canva')[0]}/social/publish`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': c.req.header('Authorization') || '',
        },
        body: JSON.stringify({
          imageUrl: exportData.exportUrl,
          platforms,
          caption,
        }),
      }
    );
    
    const publishData = await publishResponse.json();
    
    return c.json({
      success: true,
      designId,
      exportUrl: exportData.exportUrl,
      publishResults: publishData.results,
    });
  } catch (error: any) {
    console.error("Export and publish error:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================
// CONTENT SCHEDULER
// ============================================

// Generate 30-day AI content calendar
app.post("/make-server-14f75f49/ai/generate-calendar", async (c) => {
  try {
    console.log('Starting 30-day content calendar generation...');
    
    // Generate AI content for 30 days
    const calendar = await generate30DayCalendar();
    
    // Save to KV store
    for (const content of calendar) {
      await kv.set(`ai_content_day_${content.day}`, content);
    }
    
    console.log(`Generated ${calendar.length} pieces of content`);
    
    return c.json({
      success: true,
      message: `Generated ${calendar.length} days of content`,
      calendar: calendar.map(c => ({
        day: c.day,
        type: c.contentType,
        format: c.format,
        hook: c.hook,
      })),
    });
  } catch (error: any) {
    console.error("Error generating AI calendar:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Generate AI content + Canva designs for 30 days
app.post("/make-server-14f75f49/ai/generate-full-campaign", async (c) => {
  try {
    console.log('Starting FULL campaign generation (AI content + Canva designs)...');
    
    // Step 1: Generate AI content
    const calendar = await generate30DayCalendar();
    console.log(`✓ Generated ${calendar.length} AI content pieces`);
    
    // Step 2: Create Canva designs for each piece
    const designs = await createDesignsForCalendar(calendar);
    console.log(`✓ Created ${designs.length} Canva designs`);
    
    // Step 3: Save everything
    for (const design of designs) {
      await kv.set(`full_content_day_${design.day}`, design);
    }
    
    return c.json({
      success: true,
      message: `Generated ${designs.length} complete posts (AI content + designs)`,
      designs: designs.map(d => ({
        day: d.day,
        type: d.contentType,
        format: d.format,
        hook: d.hook,
        designId: d.designId,
        exportUrl: d.exportUrl,
      })),
    });
  } catch (error: any) {
    console.error("Error generating full campaign:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get AI-generated content for a specific day
app.get("/make-server-14f75f49/ai/content/:day", async (c) => {
  try {
    const day = parseInt(c.req.param('day'));
    
    // Try to get full content (AI + design) first
    let content = await kv.get(`full_content_day_${day}`);
    
    // Fall back to AI-only content
    if (!content) {
      content = await kv.get(`ai_content_day_${day}`);
    }
    
    if (!content) {
      return c.json({
        success: false,
        error: `No content found for day ${day}. Generate calendar first.`,
      }, 404);
    }
    
    return c.json({
      success: true,
      content,
    });
  } catch (error: any) {
    console.error("Error fetching AI content:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Generate single AI content piece
app.post("/make-server-14f75f49/ai/generate-single", async (c) => {
  try {
    const { day, contentType, format } = await c.req.json();
    
    const content = await generateContent({
      day: day || 1,
      contentType: contentType || 'teaching',
      format: format || 'feed_post',
    });
    
    return c.json({
      success: true,
      content,
    });
  } catch (error: any) {
    console.error("Error generating single content:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get scheduled content
app.get("/make-server-14f75f49/content/schedule", async (c) => {
  try {
    const schedules = await kv.getByPrefix('content_schedule_');
    
    return c.json({
      success: true,
      schedules: schedules.map(s => ({
        day: s.key.split('_').pop(),
        ...s.value,
      })),
    });
  } catch (error: any) {
    console.error("Error fetching schedule:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Schedule content for automated posting
app.post("/make-server-14f75f49/content/schedule", async (c) => {
  try {
    const { day, designId, platforms, caption, postTime } = await c.req.json();
    
    await kv.set(`content_schedule_${day}`, {
      designId,
      platforms,
      caption,
      postTime: postTime || '10:00',
      scheduledAt: new Date().toISOString(),
      status: 'scheduled',
    });
    
    return c.json({
      success: true,
      message: `Day ${day} scheduled successfully`,
    });
  } catch (error: any) {
    console.error("Error scheduling content:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Auto-publish today's content (called by cron)
app.post("/make-server-14f75f49/content/auto-publish", async (c) => {
  try {
    // Calculate which day we're on (1-30)
    const launchDate = new Date('2026-02-01');
    const today = new Date();
    const daysSinceLaunch = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));
    const contentDay = (daysSinceLaunch % 30) + 1;
    
    // Get today's scheduled content
    const schedule = await kv.get(`content_schedule_${contentDay}`);
    
    if (!schedule) {
      return c.json({ 
        success: false, 
        message: `No content scheduled for day ${contentDay}` 
      });
    }
    
    // Export and publish
    const publishResponse = await fetch(
      `${c.req.url.split('/content')[0]}/canva/export-and-publish`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': c.req.header('Authorization') || '',
        },
        body: JSON.stringify({
          designId: schedule.designId,
          platforms: schedule.platforms,
          caption: schedule.caption,
        }),
      }
    );
    
    const result = await publishResponse.json();
    
    // Mark as published
    await kv.set(`content_schedule_${contentDay}`, {
      ...schedule,
      status: 'published',
      publishedAt: new Date().toISOString(),
      results: result.publishResults,
    });
    
    return c.json({
      success: true,
      day: contentDay,
      ...result,
    });
  } catch (error: any) {
    console.error("Auto-publish error:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Test Canva API connection
async function testCanvaApi(apiKey: string) {
  try {
    const response = await fetch('https://api.canva.com/v1/users/me', {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });
    
    if (response.ok) {
      return { success: true, message: 'Canva API key is valid!' };
    } else {
      return { success: false, message: `Canva API error: ${response.statusText}` };
    }
  } catch (error: any) {
    return { success: false, message: `Connection error: ${error.message}` };
  }
}

// Test Meta API connection
async function testMetaApi(accessToken: string) {
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/me?access_token=${accessToken}`);
    
    if (response.ok) {
      return { success: true, message: 'Meta API token is valid!' };
    } else {
      return { success: false, message: `Meta API error: ${response.statusText}` };
    }
  } catch (error: any) {
    return { success: false, message: `Connection error: ${error.message}` };
  }
}

// Test Pinterest API connection
async function testPinterestApi(accessToken: string) {
  try {
    const response = await fetch('https://api.pinterest.com/v5/user_account', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    
    if (response.ok) {
      return { success: true, message: 'Pinterest API token is valid!' };
    } else {
      return { success: false, message: `Pinterest API error: ${response.statusText}` };
    }
  } catch (error: any) {
    return { success: false, message: `Connection error: ${error.message}` };
  }
}

// Publish to Facebook
async function publishToFacebook(imageUrl: string, caption: string) {
  try {
    let accessToken = Deno.env.get('META_ACCESS_TOKEN') || await kv.get('api_key_META_ACCESS_TOKEN');
    let pageId = Deno.env.get('META_PAGE_ID') || await kv.get('api_key_META_PAGE_ID');
    
    if (!accessToken || !pageId) {
      return { success: false, error: 'Meta credentials not configured' };
    }
    
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/photos`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: imageUrl,
          caption: caption,
          access_token: accessToken,
        }),
      }
    );
    
    const data = await response.json();
    
    if (data.error) {
      return { success: false, error: data.error.message };
    }
    
    return { success: true, postId: data.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Publish to Instagram
async function publishToInstagram(imageUrl: string, caption: string) {
  try {
    let accessToken = Deno.env.get('META_ACCESS_TOKEN') || await kv.get('api_key_META_ACCESS_TOKEN');
    let igAccountId = Deno.env.get('META_INSTAGRAM_ACCOUNT_ID') || await kv.get('api_key_META_INSTAGRAM_ACCOUNT_ID');
    
    if (!accessToken || !igAccountId) {
      return { success: false, error: 'Instagram credentials not configured' };
    }
    
    // Step 1: Create media container
    const containerResponse = await fetch(
      `https://graph.facebook.com/v18.0/${igAccountId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: caption,
          access_token: accessToken,
        }),
      }
    );
    
    const containerData = await containerResponse.json();
    
    if (containerData.error) {
      return { success: false, error: containerData.error.message };
    }
    
    // Step 2: Publish media
    const publishResponse = await fetch(
      `https://graph.facebook.com/v18.0/${igAccountId}/media_publish`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: containerData.id,
          access_token: accessToken,
        }),
      }
    );
    
    const publishData = await publishResponse.json();
    
    if (publishData.error) {
      return { success: false, error: publishData.error.message };
    }
    
    return { success: true, postId: publishData.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Publish to Pinterest
async function publishToPinterest(imageUrl: string, caption: string) {
  try {
    let accessToken = Deno.env.get('PINTEREST_ACCESS_TOKEN') || await kv.get('api_key_PINTEREST_ACCESS_TOKEN');
    
    if (!accessToken) {
      return { success: false, error: 'Pinterest token not configured' };
    }
    
    const response = await fetch(
      'https://api.pinterest.com/v5/pins',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          media_source: {
            source_type: 'image_url',
            url: imageUrl,
          },
          description: caption,
          link: 'https://www.MzMarianna.com/quiz',
        }),
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Pinterest API error' };
    }
    
    return { success: true, postId: data.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Calculate quiz result
function calculateQuizResult(responses: any): { scaffoldType: string; description: string } {
  // Quiz scoring logic - customize based on your quiz questions
  const scores = {
    process: 0,
    capacity: 0,
    emotional: 0,
    executive_function: 0,
  };

  // Example scoring (adjust based on your actual quiz)
  Object.entries(responses).forEach(([question, answer]) => {
    if (typeof answer === "string") {
      if (answer.includes("don't know how") || answer.includes("instructions")) {
        scores.process++;
      }
      if (answer.includes("tired") || answer.includes("overwhelmed")) {
        scores.capacity++;
      }
      if (answer.includes("scared") || answer.includes("anxious") || answer.includes("can't")) {
        scores.emotional++;
      }
      if (answer.includes("distracted") || answer.includes("organize") || answer.includes("forget")) {
        scores.executive_function++;
      }
    }
  });

  // Find highest score
  const maxScore = Math.max(...Object.values(scores));
  const scaffoldType = Object.keys(scores).find(
    (key) => scores[key as keyof typeof scores] === maxScore
  ) || "process";

  const descriptions = {
    process: "Your child needs step-by-step process scaffolds",
    capacity: "Your child needs capacity scaffolds for working memory",
    emotional: "Your child needs emotional scaffolds for confidence",
    executive_function: "Your child needs executive function scaffolds",
  };

  return {
    scaffoldType,
    description: descriptions[scaffoldType as keyof typeof descriptions],
  };
}

Deno.serve(app.fetch);