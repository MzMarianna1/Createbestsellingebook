# 🎨 Canva Content Publisher - Design Read Scope Setup

## Complete Guide to Setting Up Canva's Content Publisher with Design Read Scope

---

## 🎯 What You Need

The **Content Publisher** feature requires the `design:read` scope to access and export your Canva designs. Here's how to set it up properly.

---

## 📋 Prerequisites

Before starting, make sure you have:

- [ ] **Node.js v20.10.0** or higher
- [ ] **npm v10** or higher
- [ ] **git** installed
- [ ] **Canva Developer Account** (free at https://www.canva.com/developers/)
- [ ] **Canva Pro subscription** (required for API access)

---

## 🚀 STEP 1: Set Up Canva Developer App

### 1.1 Create Your App

1. **Go to:** https://www.canva.com/developers/apps
2. **Click:** "Create an app"
3. **Fill in details:**
   ```
   App name: Homework Battles Content Publisher
   Description: Automated social media content publishing for educational ebook
   App type: Content publishing
   ```
4. **Click:** "Create app"

### 1.2 Configure OAuth Scopes

**This is critical for Content Publisher!**

1. **In your app settings, go to:** "Authentication" → "Scopes"
2. **Enable these scopes:**
   - ✅ `design:read` ← **REQUIRED for Content Publisher**
   - ✅ `design:content:read` ← **REQUIRED for exporting**
   - ✅ `asset:read` ← **REQUIRED for accessing assets**
   - ✅ `folder:read` ← Optional (for organizing)

3. **Save changes**

### 1.3 Configure OAuth Redirect URLs

1. **In app settings, go to:** "Authentication" → "Redirect URLs"
2. **Add these URLs:**
   ```
   http://localhost:8080 (for development)
   https://YOUR-PROJECT.supabase.co/auth/v1/callback (for production)
   ```
3. **Save**

### 1.4 Get Your Credentials

**Copy these from your app dashboard:**
```
Client ID: xxxxx-xxxxx-xxxxx-xxxxx
Client Secret: xxxxx-xxxxx-xxxxx-xxxxx
```

**Save these securely - you'll need them!**

---

## 🛠️ STEP 2: Set Up Canva Starter Kit

### 2.1 Clone the Starter Kit

```bash
# Clone the official Canva starter kit
git clone https://github.com/canva-sdks/canva-apps-sdk-starter-kit.git canva-content-publisher

# Navigate into the directory
cd canva-content-publisher

# Install dependencies
npm install
```

### 2.2 Project Structure

After setup, you'll have:
```
canva-content-publisher/
├── src/
│   ├── app.tsx                 # Main app entry point
│   ├── content_publisher.tsx   # Your content publisher (we'll create this)
│   └── components/             # UI components
├── examples/                   # Canva API examples
├── .env                        # Environment variables (we'll create this)
├── package.json
└── webpack.config.js
```

---

## 🔧 STEP 3: Create Content Publisher Integration

### 3.1 Create Environment File

Create `.env` in the root directory:

```bash
# Canva App Credentials
CANVA_APP_ID=your_app_id_here
CANVA_CLIENT_ID=your_client_id_here
CANVA_CLIENT_SECRET=your_client_secret_here

# Backend API
BACKEND_URL=https://your-project.supabase.co/functions/v1
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OAuth
OAUTH_REDIRECT_URI=http://localhost:8080

# Content Publishing
LAUNCH_DATE=2026-02-01
```

### 3.2 Create Content Publisher File

Create `src/content_publisher.tsx`:

```typescript
import { ContentPublisherIntent } from "@canva/intents/content";

export const contentPublisher: ContentPublisherIntent = {
  async onPublish(opts) {
    const { designId, brandId } = opts;

    try {
      console.log("Publishing content from design:", designId);

      // Call your backend to handle publishing
      const response = await fetch(`${process.env.BACKEND_URL}/make-server-14f75f49/publish-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          designId: designId,
          brandId: brandId,
          action: "publish_today"
        }),
      });

      if (!response.ok) {
        throw new Error("Publishing failed");
      }

      const result = await response.json();

      return {
        state: "completed",
        message: `Published to ${result.platforms?.join(", ") || "social media"}`,
      };

    } catch (error) {
      console.error("Publishing error:", error);
      return {
        state: "failed",
        message: error.message || "Publishing failed",
      };
    }
  },

  async canPublish(opts) {
    // Check if backend is configured
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/make-server-14f75f49/health`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        return {
          canPublish: false,
          reason: "Backend not configured. Please set up your Supabase functions.",
        };
      }

      const health = await response.json();

      if (!health.socialMediaConnected) {
        return {
          canPublish: false,
          reason: "Please connect your social media accounts (Facebook/Instagram) in the Marketing Dashboard.",
        };
      }

      return { canPublish: true };

    } catch (error) {
      return {
        canPublish: false,
        reason: "Cannot connect to backend. Check your environment variables.",
      };
    }
  },
};
```

### 3.3 Update Main App File

Update `src/app.tsx`:

```typescript
import { prepareContentPublisher } from "@canva/intents/content";
import { contentPublisher } from "./content_publisher";
import React from "react";
import { createRoot } from "react-dom/client";

// Initialize Content Publisher
prepareContentPublisher(contentPublisher);

// Your app UI (optional - for configuration/preview)
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Homework Battles Content Publisher</h1>
      <p>Content Publisher is ready!</p>
      <p>Use the "Publish" button in Canva to publish your designs.</p>
      
      <div style={{ marginTop: "20px" }}>
        <h2>Setup Status:</h2>
        <ul>
          <li>✅ Content Publisher initialized</li>
          <li>✅ Backend connected</li>
          <li>✅ Ready to publish</li>
        </ul>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
```

---

## 🌐 STEP 4: Backend Integration

### 4.1 Update Your Supabase Edge Function

Add this route to `/supabase/functions/server/index.tsx`:

```typescript
// Health check endpoint for Canva app
app.get("/make-server-14f75f49/health", async (c) => {
  const metaToken = Deno.env.get("META_ACCESS_TOKEN");
  const canvaKey = Deno.env.get("CANVA_API_KEY");

  return c.json({
    status: "healthy",
    socialMediaConnected: !!metaToken,
    canvaConfigured: !!canvaKey,
    timestamp: new Date().toISOString(),
  });
});

// Publish content endpoint (called by Canva app)
app.post("/make-server-14f75f49/publish-content", async (c) => {
  try {
    const body = await c.req.json();
    const { designId, brandId, action } = body;

    console.log("Publishing content:", { designId, action });

    // Get today's content from schedule
    const today = getCurrentContentDay();
    const { data: content } = await supabase
      .from("content_schedule")
      .select("*")
      .eq("day", today)
      .single();

    if (!content) {
      return c.json({ error: "No content scheduled for today" }, 404);
    }

    // Export design from Canva
    const exportUrl = await exportCanvaDesign(designId);

    // Publish to platforms
    const results = await Promise.all(
      content.platforms.map(platform => 
        publishToPlatform(platform, content, exportUrl)
      )
    );

    // Save to database
    await supabase.from("published_content").insert({
      content_day: today,
      platforms: content.platforms,
      canva_design_id: designId,
      export_url: exportUrl,
      publish_results: results,
    });

    // Mark as published
    await supabase
      .from("content_schedule")
      .update({ is_published: true })
      .eq("day", today);

    return c.json({
      success: true,
      platforms: content.platforms,
      results: results,
    });

  } catch (error) {
    console.error("Publish error:", error);
    return c.json({ error: error.message }, 500);
  }
});

function getCurrentContentDay(): number {
  const launchDate = new Date(Deno.env.get("LAUNCH_DATE") || Date.now());
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - launchDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (diffDays % 30) + 1;
}

async function exportCanvaDesign(designId: string): Promise<string> {
  const CANVA_API_KEY = Deno.env.get("CANVA_API_KEY");
  
  const response = await fetch(`https://api.canva.com/v1/designs/${designId}/export`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CANVA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      format: "png",
      quality: "high",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to export Canva design");
  }

  const data = await response.json();
  return data.export_url;
}
```

---

## 🚀 STEP 5: Run and Test

### 5.1 Start Development Server

```bash
# In your canva-content-publisher directory
npm start
```

This starts the webpack dev server at `http://localhost:8080`

### 5.2 Preview in Canva

1. **Go to:** Your Canva app in Developer Portal
2. **Click:** "Preview"
3. **Open in:** Canva editor
4. **Create a design** using your templates
5. **Click:** "Publish" button
6. **Select:** Your app
7. **Watch it publish!** 🎉

---

## 🎨 STEP 6: Create Your Canva Templates

### 6.1 Template Requirements

Create these templates in Canva (use the sizes from your setup guide):

1. **Instagram Carousel** (1080 × 1080px, 10 pages)
2. **Instagram Story** (1080 × 1920px)
3. **Facebook Post** (1200 × 630px)
4. **Pinterest Pin** (1000 × 1500px)
5. **Testimonial Card** (1080 × 1080px)
6. **Quiz Result Graphic** (1080 × 1080px)
7. **Ad Creative** (1080 × 1080px)

### 6.2 Design Best Practices

**Use your brand colors:**
- White background: `#FFFFFF`
- Charcoal text: `#111111`
- Teal accents: `#0d9488`

**Make them templates:**
- Use text placeholders for dynamic content
- Add image placeholders
- Save to "Brand Templates" folder

### 6.3 Get Template IDs

1. **Open template in Canva**
2. **Look at URL:** `https://www.canva.com/design/DAGQx1234567/...`
3. **Copy the ID:** `DAGQx1234567`
4. **Save it** in your backend configuration

---

## ⚙️ STEP 7: Environment Variables (Complete List)

### Canva App (.env in starter kit)
```bash
CANVA_APP_ID=your_app_id
CANVA_CLIENT_ID=your_client_id
CANVA_CLIENT_SECRET=your_client_secret
BACKEND_URL=https://your-project.supabase.co/functions/v1
SUPABASE_ANON_KEY=your_anon_key
OAUTH_REDIRECT_URI=http://localhost:8080
LAUNCH_DATE=2026-02-01
```

### Supabase Edge Functions (Add via Dashboard)
```bash
CANVA_API_KEY=your_canva_api_key
CANVA_BRAND_ID=your_brand_kit_id
META_ACCESS_TOKEN=your_facebook_token
META_PAGE_ID=your_page_id
META_INSTAGRAM_ACCOUNT_ID=your_ig_id
PINTEREST_ACCESS_TOKEN=your_pinterest_token
PINTEREST_BOARD_ID=your_board_id
LAUNCH_DATE=2026-02-01
```

---

## 🧪 STEP 8: Testing Checklist

- [ ] ✅ Starter kit installed and running
- [ ] ✅ Environment variables configured
- [ ] ✅ Backend health check returns 200
- [ ] ✅ Canva app shows in Developer Portal
- [ ] ✅ OAuth scopes include `design:read`
- [ ] ✅ Can preview app in Canva editor
- [ ] ✅ Created at least 1 template
- [ ] ✅ "Publish" button appears in Canva
- [ ] ✅ Test publish works
- [ ] ✅ Content appears on social media
- [ ] ✅ Database tracks published content

---

## 🔍 Troubleshooting

### "design:read scope not enabled"

**Solution:**
1. Go to Developer Portal → Your App → Authentication
2. Enable `design:read`, `design:content:read`, `asset:read`
3. Save and try again

### "Publish button doesn't appear"

**Solution:**
1. Make sure you called `prepareContentPublisher()` in your app
2. Verify `canPublish()` returns `{ canPublish: true }`
3. Check browser console for errors

### "Backend connection failed"

**Solution:**
1. Verify Supabase Edge Function is deployed
2. Check environment variables in Supabase Dashboard
3. Test health endpoint: `curl https://your-project.supabase.co/functions/v1/make-server-14f75f49/health`

### "Export failed"

**Solution:**
1. Verify Canva API key is valid
2. Check that design is published (not draft)
3. Ensure `design:content:read` scope is enabled

---

## 📊 File Structure (Final)

```
your-project/
├── canva-content-publisher/          # Canva app (starter kit)
│   ├── src/
│   │   ├── app.tsx                   # Main UI
│   │   └── content_publisher.tsx     # Publisher logic
│   ├── .env                          # Canva app config
│   └── package.json
│
├── supabase/functions/server/        # Backend
│   ├── index.tsx                     # Main server (updated)
│   ├── canva.tsx                     # Canva utilities
│   └── ...
│
└── scripts/
    └── import-content-calendar.sql   # Content schedule
```

---

## 🎯 Workflow Summary

### One-Time Setup
1. Create Canva app with `design:read` scope
2. Clone and set up starter kit
3. Configure environment variables
4. Deploy backend updates
5. Create Canva templates

### Daily Usage (Automated)
1. Cron job runs at 10 AM
2. Backend checks content schedule
3. Gets today's content (Day X of 30)
4. Finds matching Canva template
5. Exports design
6. Publishes to all platforms
7. Tracks in database

### Manual Override (Optional)
1. Open design in Canva
2. Click "Publish" → Select your app
3. App calls backend
4. Backend publishes immediately

---

## 💡 Pro Tips

### 1. Use Brand Kit
- Set up your brand colors/fonts in Canva
- All templates will use consistent styling
- Pass `brandId` to auto-apply branding

### 2. Batch Create Templates
- Create all 7 templates in one session
- Duplicate and modify for consistency
- Save to dedicated "Content Publisher" folder

### 3. Test with One Platform First
- Start with just Facebook
- Verify it works end-to-end
- Then add Instagram, Pinterest, etc.

### 4. Monitor Logs
- Check Supabase Edge Function logs
- Check browser console in Canva
- Set up error alerting (email/Slack)

---

## 📚 Resources

- **Canva Developer Docs:** https://www.canva.com/developers/docs/
- **Content Publisher Guide:** https://www.canva.com/developers/docs/apps/content-publishing/
- **Starter Kit Repo:** https://github.com/canva-sdks/canva-apps-sdk-starter-kit
- **Canva API Reference:** https://www.canva.com/developers/docs/api-reference/

---

## ✅ You're Ready!

Once setup is complete:

1. ✅ Your Canva app has `design:read` scope
2. ✅ Starter kit is configured and running
3. ✅ Backend endpoints are ready
4. ✅ Templates are created
5. ✅ Content calendar is loaded
6. ✅ Everything publishes automatically

**Your 30-day content calendar is now fully automated with Canva!** 🎉

---

## 🆘 Need Help?

Check these guides:
- **[CANVA-AUTOMATION-SETUP.md](CANVA-AUTOMATION-SETUP.md)** - Full automation guide
- **[TOP-SELLER-STRATEGY.md](TOP-SELLER-STRATEGY.md)** - Marketing strategy
- **[30-DAY-CONTENT-CALENDAR.md](30-DAY-CONTENT-CALENDAR.md)** - Content plan

**Questions? Ask away!** 🚀
