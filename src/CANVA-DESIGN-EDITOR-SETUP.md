# 🎨 Canva Design Editor Setup Guide

## Your App: AAHAAFRb5g8

**Using Design Editor intent** - Simpler than Content Publisher, perfect for creating and editing social media graphics.

---

## 🎯 What Design Editor Does

**Design Editor** allows you to:
- ✅ Create designs from your templates
- ✅ Edit existing designs
- ✅ Export designs manually or via API
- ✅ Apply your brand kit automatically
- ✅ Integrate with your backend

**Difference from Content Publisher:**
- Design Editor = Create/Edit designs (you control export/publishing)
- Content Publisher = Auto-publish to social media (requires more setup)

**Recommendation:** Start with Design Editor, add Content Publisher later if needed.

---

## 🚀 Quick Setup (30 minutes)

### Prerequisites

- [x] Canva Pro account
- [x] App ID: `AAHAAFRb5g8` (you have this!)
- [x] Node.js v20+ installed
- [x] Supabase backend set up

---

## STEP 1: Configure Your App Scopes (5 min)

1. **Go to:** https://www.canva.com/developers/apps/AAHAAFRb5g8
2. **Click:** "Authentication" → "Scopes"
3. **Enable these scopes:**
   - ✅ `design:read`
   - ✅ `design:content:read`
   - ✅ `asset:read`
   - ✅ `design:content:write` (optional - for programmatic editing)
4. **Save**

---

## STEP 2: Set Up Starter Kit (10 min)

```bash
# Clone Canva starter kit
git clone https://github.com/canva-sdks/canva-apps-sdk-starter-kit.git homework-battles-canva

# Navigate and install
cd homework-battles-canva
npm install
```

### Configure Environment

Create `.env` file:

```bash
# Your Canva App
CANVA_APP_ID=AAHAAFRb5g8
CANVA_CLIENT_ID=your_client_id_here
CANVA_CLIENT_SECRET=your_client_secret_here

# Your Backend
BACKEND_URL=https://your-project.supabase.co/functions/v1
SUPABASE_ANON_KEY=your_supabase_anon_key

# OAuth
OAUTH_REDIRECT_URI=http://localhost:8080
```

**Get credentials:**
- Go to your app in Developer Portal
- Copy Client ID and Client Secret

---

## STEP 3: Add Your Integration Files (5 min)

### Create `src/intents/design_editor.tsx`

```typescript
import type { DesignEditorIntent } from "@canva/intents/design";

const designEditor: DesignEditorIntent = {
  async onEdit(opts) {
    const { designId } = opts;
    
    console.log("Editing design:", designId);
    
    // Optional: Load design metadata from your backend
    const response = await fetch(
      `${process.env.BACKEND_URL}/make-server-14f75f49/design-metadata/${designId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
      }
    );
    
    const metadata = await response.json();
    console.log("Design metadata:", metadata);
    
    return {
      state: "completed",
      message: "Design opened!",
    };
  },

  async onCreate(opts) {
    const { brandId } = opts;
    
    console.log("Creating design with brand:", brandId);
    
    return {
      state: "completed",
      message: "Design created!",
    };
  },
};

export default designEditor;
```

### Update `src/app.tsx`

```typescript
import { prepareDesignEditor } from "@canva/intents/design";
import designEditor from "./intents/design_editor";
import React from "react";
import { createRoot } from "react-dom/client";

// Initialize Design Editor
prepareDesignEditor(designEditor);

// Optional UI for your app
function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🎓 Homework Battles Design Studio</h1>
      <p>Create social media graphics for your ebook marketing.</p>
      
      <div style={{ marginTop: "30px" }}>
        <h2>Quick Templates:</h2>
        <ul>
          <li>Instagram Carousel (10 slides)</li>
          <li>Instagram Story/Reel</li>
          <li>Facebook Post</li>
          <li>Pinterest Pin</li>
          <li>Testimonial Card</li>
        </ul>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Your 30-Day Content Calendar:</h2>
        <p>Templates organized by day for easy scheduling.</p>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
```

---

## STEP 4: Start Development Server (2 min)

```bash
npm start
```

Server starts at: `http://localhost:8080`

---

## STEP 5: Preview in Canva (5 min)

1. **Go to:** https://www.canva.com/developers/apps/AAHAAFRb5g8
2. **Click:** "Preview"
3. **Opens in Canva editor**
4. **Create a design** - Your app appears in the sidebar!
5. **Test editing** - Click on existing design

---

## 🎨 STEP 6: Create Your Templates

### Templates You Need

Create these in Canva:

**1. Instagram Carousel (1080 × 1080px, 10 pages)**
- Day 1: "3 Signs Homework is Traumatizing Your Child"
- Day 8: "Decode the Resistance"
- Save as template

**2. Instagram Story/Reel (1080 × 1920px)**
- Day 2: Testimonial video style
- Day 9: Translation guide
- Save as template

**3. Facebook Post (1200 × 630px)**
- Day 3: Question post
- Day 10: Case study
- Save as template

**4. Pinterest Pin (1000 × 1500px)**
- Day 7: "Stop Homework Battles in 48 Hours"
- Tall vertical format
- Save as template

**5. Testimonial Card (1080 × 1080px)**
- Before/after format
- Customer quote template
- Save as template

**6. Static Image/Checklist (1080 × 1080px)**
- Day 5: Homework Resistance Decoder
- Free download graphic
- Save as template

**7. Ad Creative (1080 × 1080px)**
- Promotional design
- CTA focused
- Save as template

### Brand Consistency

**Use your brand colors:**
```
Background: #FFFFFF (white)
Text: #111111 (charcoal)
Accent: #0d9488 (teal)
```

**Set up Brand Kit in Canva:**
1. Canva → Brand Kit
2. Add these colors
3. Add your fonts
4. Save Brand Kit ID

---

## 🔧 STEP 7: Backend Integration (Optional)

### Export Designs Programmatically

Add to `/supabase/functions/server/index.tsx`:

```typescript
// Export design endpoint
app.post("/make-server-14f75f49/export-design", async (c) => {
  const { designId } = await c.req.json();
  
  const CANVA_API_KEY = Deno.env.get("CANVA_API_KEY");
  
  // Export from Canva
  const response = await fetch(
    `https://api.canva.com/v1/designs/${designId}/export`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CANVA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        format: "png",
        quality: "high",
      }),
    }
  );
  
  const data = await response.json();
  
  return c.json({
    exportUrl: data.export_url,
    designId: designId,
  });
});

// Save design metadata
app.post("/make-server-14f75f49/save-design", async (c) => {
  const { designId, contentDay, platform } = await c.req.json();
  
  const { data } = await supabase
    .from("content_designs")
    .insert({
      design_id: designId,
      content_day: contentDay,
      platform: platform,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  return c.json(data);
});
```

### Database Schema

```sql
-- Store designs created in Canva
CREATE TABLE content_designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_id TEXT NOT NULL,
  content_day INTEGER,
  platform TEXT,
  export_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_content_designs_day ON content_designs(content_day);
```

---

## 📱 STEP 8: Publishing Workflow

### Option 1: Manual Export + Auto-Publish

**Workflow:**
1. Create design in Canva (using your templates)
2. Your app exports it via API
3. Backend auto-posts to social media

**Code in your app:**
```typescript
async function exportAndPublish(designId: string) {
  // Export
  const exportResponse = await fetch(
    `${process.env.BACKEND_URL}/make-server-14f75f49/export-design`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ designId }),
    }
  );
  
  const { exportUrl } = await exportResponse.json();
  
  // Publish
  const publishResponse = await fetch(
    `${process.env.BACKEND_URL}/make-server-14f75f49/publish-content`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        imageUrl: exportUrl,
        platform: "facebook",
        caption: "Your caption here",
      }),
    }
  );
  
  return await publishResponse.json();
}
```

### Option 2: Scheduled Export + Publish

**Workflow:**
1. Create all 30 designs in Canva (one-time)
2. Save design IDs in database
3. Cron job exports + publishes daily

**Database:**
```sql
INSERT INTO content_schedule (day, design_id, platforms) VALUES
(1, 'DAGQx1234567', ARRAY['instagram', 'facebook']),
(2, 'DAGQx7654321', ARRAY['instagram', 'tiktok']);
```

**Cron job:**
```typescript
// In edge function
const today = getCurrentContentDay();
const { data: content } = await supabase
  .from("content_schedule")
  .select("*")
  .eq("day", today)
  .single();

// Export design
const exportUrl = await exportCanvaDesign(content.design_id);

// Publish to platforms
await publishToFacebook(exportUrl, content.caption);
await publishToInstagram(exportUrl, content.caption);
```

---

## ✅ Testing Checklist

- [ ] ✅ App ID configured (AAHAAFRb5g8)
- [ ] ✅ Scopes enabled (design:read, design:content:read)
- [ ] ✅ Starter kit running (`npm start`)
- [ ] ✅ App appears in Canva editor
- [ ] ✅ Can create new design
- [ ] ✅ Can edit existing design
- [ ] ✅ Backend export endpoint works
- [ ] ✅ Created at least 1 template
- [ ] ✅ Brand kit configured
- [ ] ✅ Export quality is high

---

## 🎯 Recommended Workflow

### Week 1: Setup
- ✅ Configure app and scopes
- ✅ Set up starter kit
- ✅ Create 7 templates (one per format)

### Week 2: Content Creation
- ✅ Create 30 designs (one per day)
- ✅ Save design IDs in database
- ✅ Test export quality

### Week 3: Automation
- ✅ Set up backend export endpoint
- ✅ Configure social media publishing
- ✅ Test end-to-end flow

### Week 4: Launch
- ✅ Schedule cron job
- ✅ Monitor first week of posts
- ✅ Adjust as needed

---

## 💡 Pro Tips

### 1. Use Folders in Canva
- Create folder: "30-Day Content Calendar"
- Organize by week or platform
- Easy to find designs

### 2. Name Designs Consistently
```
Day 01 - Instagram Carousel - 3 Signs
Day 02 - Instagram Story - Testimonial
Day 03 - Facebook Post - Question
```

### 3. Duplicate & Edit
- Create Day 1 design
- Duplicate 29 times
- Edit text/images for each day
- Faster than starting from scratch

### 4. Export Settings
```json
{
  "format": "png",
  "quality": "high",
  "pages": "all" // for carousels
}
```

### 5. Track Performance
- Save design ID when posted
- Link to social media post ID
- Track which designs perform best
- Create more like top performers

---

## 🔍 Troubleshooting

### "App doesn't appear in Canva"
→ Check that app is in "Development" mode in Developer Portal  
→ Verify you're logged into same Canva account

### "Can't export design"
→ Verify `design:content:read` scope is enabled  
→ Check Canva API key in environment variables

### "Export quality is low"
→ Use `quality: "high"` in export request  
→ Create designs at correct dimensions (1080×1080px minimum)

### "Brand kit not applying"
→ Pass `brandId` parameter in design creation  
→ Verify brand kit is saved in Canva

---

## 📊 What You Can Build

### Scenario 1: Basic (Manual)
- Create designs in Canva
- Download manually
- Post manually
- **Time: 30 min/post**

### Scenario 2: Semi-Automated
- Create designs in Canva
- Export via API (click button)
- Auto-post to social media
- **Time: 5 min/post**

### Scenario 3: Fully Automated
- Pre-create 30 designs
- Save design IDs
- Cron exports + posts daily
- **Time: 2 hours setup, then zero**

**Recommendation:** Start with Scenario 2, move to 3 once tested.

---

## 🚀 Next Steps

1. **Complete setup** (Steps 1-5 above)
2. **Create 1 test design**
3. **Test export + publish**
4. **Create 7 templates** (one per format)
5. **Create 30 designs** (full calendar)
6. **Set up automation** (cron job)
7. **Launch!** 🎉

---

## 📚 Resources

- **Your App:** https://www.canva.com/developers/apps/AAHAAFRb5g8
- **Canva Design API:** https://www.canva.com/developers/docs/design-editing/
- **Starter Kit:** https://github.com/canva-sdks/canva-apps-sdk-starter-kit
- **Your Content Calendar:** [30-DAY-CONTENT-CALENDAR.md](30-DAY-CONTENT-CALENDAR.md)

---

## ✅ You're Ready!

Your app (`AAHAAFRb5g8`) is set up for:
- ✅ Creating designs from templates
- ✅ Editing existing designs
- ✅ Exporting via API
- ✅ Auto-publishing to social media
- ✅ Tracking performance

**Now create your templates and start automating!** 🚀
