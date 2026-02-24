# 🎨 Canva Automation Setup Guide

## Automated Content Publishing for Your 30-Day Calendar

This guide shows you how to connect Canva to automatically generate designs and publish your content calendar to Facebook, Instagram, Pinterest, and TikTok.

---

## 🎯 What This Does

**Automated Content Pipeline:**
```
Content Calendar → Canva Design → Export Image → Post to Social Media
```

**Features:**
- ✅ Auto-generates social media graphics from templates
- ✅ Publishes to Facebook, Instagram, Pinterest automatically
- ✅ 30-day content calendar (from your strategy guide)
- ✅ Tracks all posts in database
- ✅ Maintains brand consistency
- ✅ Saves 10-20 hours/week

---

## 📋 Prerequisites

### 1. Accounts You Need
- [ ] **Canva Pro account** (for API access)
- [ ] **Facebook Business Page** (for publishing)
- [ ] **Instagram Business/Creator account** (connected to Facebook)
- [ ] **Pinterest Business account** (optional)
- [ ] **Supabase project** (for tracking)

### 2. API Access Required
- [ ] Canva API key
- [ ] Meta (Facebook/Instagram) Access Token
- [ ] Pinterest Access Token (optional)
- [ ] TikTok Access Token (optional)

---

## 🚀 STEP 1: Canva Setup

### Create Your Design Templates

**You need to create 7 template designs in Canva:**

1. **Instagram Carousel** (10 slides)
   - Size: 1080 × 1080px
   - For: Multi-slide educational posts
   - Design ID: Save this for configuration

2. **Instagram Story/Reel** 
   - Size: 1080 × 1920px
   - For: Video-style vertical content
   - Design ID: Save this

3. **Facebook Post** 
   - Size: 1200 × 630px
   - For: Link preview posts
   - Design ID: Save this

4. **Pinterest Pin** 
   - Size: 1000 × 1500px
   - For: Tall vertical pins
   - Design ID: Save this

5. **Testimonial Card** 
   - Size: 1080 × 1080px
   - For: Customer success stories
   - Design ID: Save this

6. **Quiz Result Graphic** 
   - Size: 1080 × 1080px
   - For: Personalized quiz results
   - Design ID: Save this

7. **Ad Creative** 
   - Size: 1080 × 1080px
   - For: Paid advertising
   - Design ID: Save this

### Brand Kit Setup in Canva

1. **Go to:** Canva → Brand Kit
2. **Add your brand colors:**
   - Primary: `#FFFFFF` (white)
   - Text: `#111111` (charcoal)
   - Accent: `#0d9488` (teal)
3. **Upload logo** (if you have one)
4. **Set brand fonts** (use bold, clean fonts)
5. **Save Brand Kit ID**

---

## 🔑 STEP 2: Get Canva API Key

### Apply for Canva Developer Access

1. **Go to:** https://www.canva.com/developers/
2. **Click:** "Get Started"
3. **Create an app:**
   - App name: "Homework Battles Content Publisher"
   - Description: "Automated social media content for educational ebook"
   - Use case: "Content Publishing"
4. **Get your API key:**
   - Copy the API Key
   - Copy the Client ID
   - Copy the Client Secret
5. **Set OAuth redirect:**
   - Add: `https://your-supabase-project.supabase.co/auth/v1/callback`

### Save Your Credentials

```env
CANVA_API_KEY=your_api_key_here
CANVA_CLIENT_ID=your_client_id_here
CANVA_CLIENT_SECRET=your_client_secret_here
CANVA_BRAND_ID=your_brand_kit_id_here
```

---

## 📱 STEP 3: Meta Business Suite Setup

### Connect Facebook & Instagram

1. **Go to:** https://business.facebook.com/
2. **Create Business Manager** (if you don't have one)
3. **Add your Facebook Page**
4. **Connect Instagram:**
   - Settings → Instagram Accounts
   - Click "Connect Account"
   - Choose your Instagram Business account
5. **Save IDs:**
   - Facebook Page ID (found in Page Settings → About)
   - Instagram Account ID (found in Instagram Settings)

### Generate Access Token

**Method 1: Facebook Graph API Explorer (Easiest)**

1. **Go to:** https://developers.facebook.com/tools/explorer/
2. **Select your app** (or create one)
3. **Select permissions:**
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `instagram_basic`
   - `instagram_content_publish`
   - `business_management`
4. **Click:** "Generate Access Token"
5. **Get Long-Lived Token:**
   ```bash
   https://graph.facebook.com/v18.0/oauth/access_token?
   grant_type=fb_exchange_token&
   client_id=YOUR_APP_ID&
   client_secret=YOUR_APP_SECRET&
   fb_exchange_token=SHORT_LIVED_TOKEN
   ```
6. **Save the token** (lasts 60 days, can be refreshed)

**Method 2: Use Meta Business Suite**

1. **Settings → Business Settings → Users → System Users**
2. **Create System User:** "Content Publisher Bot"
3. **Assign Assets:** Your Page and Instagram account
4. **Generate Token:** With all required permissions
5. **Save token** (never expires if configured correctly)

### Save Your Credentials

```env
META_ACCESS_TOKEN=your_long_lived_token_here
META_PAGE_ID=your_facebook_page_id_here
META_INSTAGRAM_ACCOUNT_ID=your_instagram_account_id_here
```

---

## 📌 STEP 4: Pinterest Setup (Optional)

### Connect Pinterest Business

1. **Go to:** https://developers.pinterest.com/
2. **Create an app:**
   - App name: "Homework Battles Publisher"
   - Description: "Educational content automation"
3. **Get OAuth credentials**
4. **Generate Access Token:**
   - Scopes: `pins:read`, `pins:write`, `boards:read`, `boards:write`
5. **Create a board:** "Homework Help" (save Board ID)

### Save Your Credentials

```env
PINTEREST_ACCESS_TOKEN=your_pinterest_token_here
PINTEREST_BOARD_ID=your_board_id_here
```

---

## 🎬 STEP 5: TikTok Setup (Optional)

### TikTok Business API

1. **Go to:** https://developers.tiktok.com/
2. **Apply for API access** (requires business verification)
3. **Note:** TikTok requires video files (not images)
4. **Alternative:** Use TikTok's content scheduling tool manually

---

## 🗄️ STEP 6: Supabase Database Setup

### Create Tables for Tracking

**Run this SQL in Supabase SQL Editor:**

```sql
-- Published Content Tracking
CREATE TABLE published_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_day INTEGER NOT NULL,
  platforms TEXT[] NOT NULL,
  canva_design_id TEXT,
  export_url TEXT,
  publish_results JSONB,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Performance Tracking
CREATE TABLE content_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  published_content_id UUID REFERENCES published_content(id),
  platform TEXT NOT NULL,
  post_id TEXT,
  impressions INTEGER DEFAULT 0,
  engagements INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Schedule (30-day calendar)
CREATE TABLE content_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day INTEGER NOT NULL UNIQUE,
  platforms TEXT[] NOT NULL,
  format TEXT NOT NULL,
  headline TEXT NOT NULL,
  body TEXT NOT NULL,
  cta TEXT,
  cta_url TEXT,
  hashtags TEXT[],
  design_template TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  scheduled_for TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_published_content_day ON published_content(content_day);
CREATE INDEX idx_published_content_date ON published_content(published_at);
CREATE INDEX idx_content_performance_platform ON content_performance(platform);
CREATE INDEX idx_content_schedule_day ON content_schedule(day);
```

---

## ⚙️ STEP 7: Environment Variables

### Add to Supabase Edge Functions

**Go to:** Supabase Dashboard → Edge Functions → Settings → Secrets

```bash
# Canva
CANVA_API_KEY=your_api_key_here
CANVA_CLIENT_ID=your_client_id_here
CANVA_CLIENT_SECRET=your_client_secret_here
CANVA_BRAND_ID=your_brand_kit_id_here

# Meta (Facebook/Instagram)
META_ACCESS_TOKEN=your_long_lived_token_here
META_PAGE_ID=your_facebook_page_id_here
META_INSTAGRAM_ACCOUNT_ID=your_instagram_account_id_here

# Pinterest (optional)
PINTEREST_ACCESS_TOKEN=your_pinterest_token_here
PINTEREST_BOARD_ID=your_board_id_here

# TikTok (optional)
TIKTOK_ACCESS_TOKEN=your_tiktok_token_here

# Launch Configuration
LAUNCH_DATE=2026-02-01  # Your ebook launch date
```

---

## 🚀 STEP 8: Deploy & Test

### Deploy Edge Functions

```bash
# Navigate to your project
cd your-project

# Deploy the Canva integration
supabase functions deploy canva-publisher

# Test it
supabase functions invoke canva-publisher --data '{"action": "test"}'
```

### Test the Integration

**Test Canva Export:**
```typescript
// In Supabase SQL Editor or via API
SELECT * FROM supabase_functions.http_request(
  'POST',
  'https://your-project.supabase.co/functions/v1/canva-publisher',
  ARRAY[('Authorization', 'Bearer YOUR_ANON_KEY')],
  'application/json',
  '{"action": "export_design", "designId": "DAGQxTEST123"}'
);
```

**Test Facebook Publishing:**
```typescript
// Test posting to Facebook
SELECT * FROM supabase_functions.http_request(
  'POST',
  'https://your-project.supabase.co/functions/v1/canva-publisher',
  ARRAY[('Authorization', 'Bearer YOUR_ANON_KEY')],
  'application/json',
  '{"action": "publish", "platform": "facebook", "day": 1}'
);
```

---

## 📅 STEP 9: Load Your 30-Day Content Calendar

### Import Content Schedule

**Run this in Supabase:**

```sql
-- Day 1
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(1, ARRAY['instagram', 'facebook', 'tiktok'], 'carousel', '3 SIGNS HOMEWORK IS TRAUMATIZING YOUR CHILD', 'If you see these 3 things, homework isn''t just hard—it''s harmful...', 'Take the Quiz', 'https://www.MzMarianna.com/quiz', ARRAY['homeworkbattles', 'parentingtips', 'ADHDparenting'], 'instagram_carousel_10slides');

-- Day 2
INSERT INTO content_schedule (day, platforms, format, headline, body, cta, cta_url, hashtags, design_template) VALUES
(2, ARRAY['instagram', 'tiktok'], 'video', 'From 2 Hours to 30 Minutes in ONE NIGHT', 'Last week a mom messaged me...', 'Get the Protocol', 'https://www.MzMarianna.com/quiz', ARRAY['homeworkhelp', 'parentingwin'], 'instagram_story_video');

-- Continue for all 30 days...
```

**Or use the bulk import script:**

See `/scripts/import-content-calendar.sql` (to be created)

---

## 🤖 STEP 10: Automate Publishing

### Schedule Daily Posts

**Create a cron job in Supabase:**

```sql
-- Run every day at 10 AM
SELECT cron.schedule(
  'publish-daily-content',
  '0 10 * * *',  -- 10:00 AM daily
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/canva-publisher',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
    body := '{"action": "publish_today"}'::jsonb
  );
  $$
);
```

**Or use n8n/Zapier:**

1. **Trigger:** Schedule (daily at 10 AM)
2. **Action:** HTTP Request to your Edge Function
3. **Payload:**
   ```json
   {
     "action": "publish_today"
   }
   ```

---

## 📊 STEP 11: Monitor Performance

### Create Analytics Dashboard

**Track key metrics:**
- Posts published (daily count)
- Platform distribution
- Engagement rates
- Click-through rates to quiz
- Quiz completions from social
- Sales from social traffic

**Query example:**
```sql
-- Daily publishing stats
SELECT 
  DATE(published_at) as date,
  COUNT(*) as posts_published,
  array_agg(DISTINCT unnest(platforms)) as platforms_used
FROM published_content
WHERE published_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(published_at)
ORDER BY date DESC;

-- Platform performance
SELECT 
  platform,
  SUM(impressions) as total_impressions,
  SUM(engagements) as total_engagements,
  ROUND(AVG(engagements::float / NULLIF(impressions, 0) * 100), 2) as engagement_rate
FROM content_performance
GROUP BY platform;
```

---

## ✅ Testing Checklist

Before going live:

- [ ] ✅ Canva templates created (7 templates)
- [ ] ✅ Canva API key working (test export)
- [ ] ✅ Facebook access token valid (test post)
- [ ] ✅ Instagram connection working (test post)
- [ ] ✅ Pinterest (optional) working
- [ ] ✅ Supabase tables created
- [ ] ✅ Environment variables set
- [ ] ✅ Edge functions deployed
- [ ] ✅ Test post published successfully
- [ ] ✅ Content calendar loaded (30 days)
- [ ] ✅ Cron job scheduled
- [ ] ✅ Analytics tracking working

---

## 🆘 Troubleshooting

### "Canva API key invalid"
→ Regenerate key in Canva Developer Portal

### "Facebook token expired"
→ Use long-lived token or System User token
→ Refresh token every 60 days

### "Instagram post failed"
→ Verify Instagram is connected to Facebook Page
→ Check that account is Business or Creator
→ Verify image meets Instagram requirements (1080x1080px minimum)

### "Post not appearing"
→ Check platform's posting limits (don't exceed rate limits)
→ Facebook: 75 posts/day
→ Instagram: 25 posts/day
→ Pinterest: 100 pins/day

### "Design export failed"
→ Verify design is "published" in Canva
→ Check design permissions (must be owned by API account)

---

## 💰 Cost Breakdown

### API Costs (Estimated)

**Canva Pro:**
- $12.99/month (required for API access)

**Meta (Facebook/Instagram):**
- FREE (no API costs)

**Pinterest:**
- FREE (no API costs)

**Supabase:**
- FREE tier (up to 500MB database, 2GB bandwidth)
- Or $25/month Pro plan (recommended for production)

**Total Monthly Cost:** ~$13-38/month

**Time Saved:** 10-20 hours/week (worth $200-400/week)

**ROI:** Massive! 🚀

---

## 🎯 Next Steps

1. **Complete setup** (Steps 1-10)
2. **Test with Day 1 content**
3. **Monitor first week** (adjust as needed)
4. **Scale to full 30-day calendar**
5. **Analyze performance** (optimize top performers)
6. **Refresh content** (create new 30-day cycles)

---

## 📚 Additional Resources

- **Canva API Docs:** https://www.canva.com/developers/docs/
- **Meta Business API:** https://developers.facebook.com/docs/
- **Pinterest API:** https://developers.pinterest.com/docs/
- **Supabase Edge Functions:** https://supabase.com/docs/guides/functions

---

## 🚀 You're Ready!

Once setup is complete, your content will automatically:
1. Generate designs in Canva
2. Export high-quality images
3. Post to Facebook, Instagram, Pinterest
4. Track performance
5. Save you 10-20 hours/week

**Your 30-day content calendar runs on autopilot!** 🎉

**Questions? Check the main [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md) or ask!**
