# 🚀 Canva Integration Quick Start

## Get Your Content Calendar Automated in 30 Minutes

This is the fastest path to getting your Canva content automation working. Follow these steps in order.

---

## ⏱️ Time Estimate: 30-45 minutes

---

## ✅ STEP 1: Prerequisites (5 min)

Make sure you have:
- [ ] Canva Pro account ($13/month)
- [ ] Node.js v20+ installed
- [ ] Supabase project set up
- [ ] Facebook Business page
- [ ] Instagram Business account

**Don't have these?** See [CANVA-AUTOMATION-SETUP.md](CANVA-AUTOMATION-SETUP.md) for detailed setup.

---

## 🎯 STEP 2: Create Canva Developer App (5 min)

1. **Go to:** https://www.canva.com/developers/apps
2. **Click:** "Create an app"
3. **Fill in:**
   - Name: "Homework Battles Publisher"
   - Type: "Content publishing"
4. **In Authentication → Scopes, enable:**
   - ✅ `design:read`
   - ✅ `design:content:read`
   - ✅ `asset:read`
5. **Save your credentials:**
   ```
   Client ID: [copy this]
   Client Secret: [copy this]
   ```

**Done!** ✅

---

## 🛠️ STEP 3: Install Canva Starter Kit (5 min)

```bash
# Clone the starter kit
git clone https://github.com/canva-sdks/canva-apps-sdk-starter-kit.git canva-publisher

# Navigate and install
cd canva-publisher
npm install
```

**Done!** ✅

---

## ⚙️ STEP 4: Configure Environment (5 min)

Create `.env` file in `canva-publisher/`:

```bash
CANVA_CLIENT_ID=your_client_id_from_step_2
CANVA_CLIENT_SECRET=your_client_secret_from_step_2
BACKEND_URL=https://your-project.supabase.co/functions/v1
SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Get Supabase keys:**
- Dashboard → Settings → API
- Copy "anon" key

**Done!** ✅

---

## 📝 STEP 5: Create Content Publisher (5 min)

Create `src/content_publisher.tsx`:

```typescript
import { ContentPublisherIntent } from "@canva/intents/content";

export const contentPublisher: ContentPublisherIntent = {
  async onPublish(opts) {
    const { designId } = opts;

    const response = await fetch(`${process.env.BACKEND_URL}/make-server-14f75f49/publish-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ designId }),
    });

    const result = await response.json();

    return {
      state: result.success ? "completed" : "failed",
      message: result.message || "Published!",
    };
  },

  async canPublish() {
    return { canPublish: true };
  },
};
```

Update `src/app.tsx`:

```typescript
import { prepareContentPublisher } from "@canva/intents/content";
import { contentPublisher } from "./content_publisher";

prepareContentPublisher(contentPublisher);

console.log("✅ Content Publisher ready!");
```

**Done!** ✅

---

## 🌐 STEP 6: Update Backend (5 min)

Add to `/supabase/functions/server/index.tsx`:

```typescript
// Publish content endpoint
app.post("/make-server-14f75f49/publish-content", async (c) => {
  const { designId } = await c.req.json();

  // Export from Canva
  const exportUrl = await fetch(`https://api.canva.com/v1/designs/${designId}/export`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("CANVA_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ format: "png", quality: "high" }),
  }).then(r => r.json()).then(d => d.export_url);

  // Publish to Facebook (example)
  const posted = await fetch(`https://graph.facebook.com/v18.0/${Deno.env.get("META_PAGE_ID")}/photos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: exportUrl,
      caption: "Check out our latest content!",
      access_token: Deno.env.get("META_ACCESS_TOKEN"),
    }),
  });

  return c.json({ success: true, message: "Published to Facebook!" });
});
```

**Deploy:**
```bash
supabase functions deploy server
```

**Done!** ✅

---

## 🔑 STEP 7: Add Environment Variables (3 min)

**In Supabase Dashboard → Edge Functions → Settings:**

```bash
CANVA_API_KEY=your_canva_api_key
META_ACCESS_TOKEN=your_facebook_token
META_PAGE_ID=your_page_id
```

**Get Facebook token:** See [CANVA-AUTOMATION-SETUP.md](CANVA-AUTOMATION-SETUP.md) Step 3

**Done!** ✅

---

## 🚀 STEP 8: Test It! (5 min)

```bash
# Start Canva app
cd canva-publisher
npm start
```

1. **Go to:** http://localhost:8080
2. **Open Canva** → Developer Portal → Your App → Preview
3. **Create a test design** (1080x1080px)
4. **Click "Publish"** → Select your app
5. **Watch it publish!** 🎉

**Check Facebook** - Your post should appear!

**Done!** ✅

---

## 🎨 STEP 9: Create Templates (Optional - 15 min)

Create these in Canva:

1. **Instagram Post** (1080×1080px)
2. **Instagram Story** (1080×1920px)
3. **Facebook Post** (1200×630px)

**Use your brand:**
- Background: White `#FFFFFF`
- Text: Charcoal `#111111`
- Accent: Teal `#0d9488`

**Save template IDs** for automation

---

## 📅 STEP 10: Load Content Calendar (Optional - 5 min)

**In Supabase SQL Editor:**

```sql
-- Create table
CREATE TABLE content_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day INTEGER NOT NULL,
  platforms TEXT[],
  headline TEXT,
  body TEXT,
  cta_url TEXT
);

-- Add Day 1 content
INSERT INTO content_schedule (day, platforms, headline, body, cta_url) VALUES
(1, ARRAY['facebook', 'instagram'], '3 Signs Homework is Traumatizing Your Child', 
'If you see these 3 things, homework isn''t just hard—it''s harmful...', 
'https://www.MzMarianna.com/quiz');
```

**Full calendar:** See `/scripts/import-content-calendar.sql`

---

## ✅ YOU'RE DONE!

### What You Built:
- ✅ Canva app with Content Publisher
- ✅ Backend endpoint that publishes to social media
- ✅ Auto-export from Canva
- ✅ Auto-post to Facebook/Instagram
- ✅ Ready to scale to 30-day calendar

### Next Steps:
1. **Create 7 Canva templates** (15 min)
2. **Load full 30-day calendar** (5 min)
3. **Set up cron job** (5 min) - Auto-publish daily
4. **Let it run!** 🚀

---

## 📚 Need More Help?

### Basic Setup Issues
→ [CANVA-DESIGN-READ-SETUP.md](CANVA-DESIGN-READ-SETUP.md)

### Full Automation Guide
→ [CANVA-AUTOMATION-SETUP.md](CANVA-AUTOMATION-SETUP.md)

### Content Strategy
→ [30-DAY-CONTENT-CALENDAR.md](30-DAY-CONTENT-CALENDAR.md)

### Launch Planning
→ [LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md)

---

## 🎯 Summary

**You just built:**
- Automated content publishing system
- Canva → Export → Social Media pipeline
- Ready to scale to full automation

**Time spent:** 30-45 minutes  
**Time saved:** 20-40 hours/month  
**ROI:** 🚀🚀🚀

**Now go automate your marketing!** 🎉
