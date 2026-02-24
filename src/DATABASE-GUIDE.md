# 📊 DATABASE GUIDE - Production Schema

## 🚀 Quick Setup

### **Step 1: Run the SQL**

1. Go to **Supabase Dashboard** → Your Project
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy/paste entire `/database-schema.sql` file
5. Click **Run** (or Cmd/Ctrl + Enter)
6. ✅ All tables created!

---

### **Step 2: Verify Tables**

Go to **Table Editor** and you should see:

✅ user_profiles  
✅ content_calendar  
✅ scheduled_posts  
✅ published_posts  
✅ quiz_results  
✅ email_subscribers  
✅ orders  
✅ email_sequences  
✅ email_logs  
✅ social_accounts  
✅ analytics_daily  
✅ webhook_logs  

---

## 📋 Table Overview

### **1. user_profiles**
**Purpose:** Extended user info beyond Supabase auth  
**Key Fields:** `user_id`, `email`, `subscription_tier`, `stripe_customer_id`  
**Use Case:** Store user settings, subscription status, default post times

**Example:**
```sql
INSERT INTO user_profiles (user_id, email, full_name, business_name)
VALUES (auth.uid(), 'marianna@mzmarianna.com', 'Marianna Vitale', 'Mz. Marianna''s Learning Kingdom');
```

---

### **2. content_calendar**
**Purpose:** AI-generated content for 30-day calendars  
**Key Fields:** `day_number`, `content_type`, `hook`, `caption`, `visual_prompt`  
**Use Case:** Store AI-generated posts before publishing

**Content Flow:**
```
draft → approved → scheduled → published
```

**Example:**
```sql
SELECT * FROM content_calendar 
WHERE user_id = auth.uid() 
AND status = 'draft'
ORDER BY day_number;
```

---

### **3. scheduled_posts**
**Purpose:** Posts scheduled for future publishing  
**Key Fields:** `scheduled_time`, `platform`, `status`, `caption`  
**Use Case:** Queue posts for auto-publishing

**Example:**
```sql
INSERT INTO scheduled_posts (user_id, content_id, platform, scheduled_time, caption, image_url)
VALUES (
  auth.uid(),
  'content-uuid-here',
  'instagram',
  '2026-02-10 12:00:00+00',
  'Your caption here...',
  'https://cdn.canva.com/...'
);
```

---

### **4. published_posts**
**Purpose:** Archive of published posts with analytics  
**Key Fields:** `platform_post_id`, `reach`, `impressions`, `engagement_rate`  
**Use Case:** Track performance, sync analytics from social platforms

**Example Query - Top Performing Posts:**
```sql
SELECT 
  caption,
  platform,
  reach,
  engagement_rate,
  published_at
FROM published_posts
WHERE user_id = auth.uid()
ORDER BY engagement_rate DESC
LIMIT 10;
```

---

### **5. quiz_results**
**Purpose:** Lead generation from parenting scaffold quiz  
**Key Fields:** `email`, `primary_scaffold_type`, `lead_status`, `converted_to_customer`  
**Use Case:** Capture quiz responses, track conversions

**Scaffold Types:**
- `process` - Needs step-by-step systems
- `capacity` - Needs workload management
- `emotional` - Needs emotional regulation support

**Example Query - New Leads:**
```sql
SELECT 
  email,
  first_name,
  primary_scaffold_type,
  created_at
FROM quiz_results
WHERE lead_status = 'new'
AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

---

### **6. email_subscribers**
**Purpose:** Email list management  
**Key Fields:** `email`, `status`, `tags`, `scaffold_type`, `preferences`  
**Use Case:** Manage subscribers, track engagement

**Segmentation via Tags:**
```sql
-- Find homeschool parents with ADHD kids
SELECT * FROM email_subscribers
WHERE 'homeschooler' = ANY(tags)
AND 'adhd' = ANY(tags)
AND status = 'active';
```

---

### **7. orders**
**Purpose:** Ebook purchases and transactions  
**Key Fields:** `email`, `amount`, `payment_status`, `stripe_payment_intent_id`  
**Use Case:** Track sales, fulfill orders, manage refunds

**Revenue Query:**
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as orders,
  SUM(amount) as revenue
FROM orders
WHERE payment_status = 'completed'
AND created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

### **8. email_sequences**
**Purpose:** Automated email campaign definitions  
**Key Fields:** `name`, `trigger_type`, `emails` (JSONB), `status`  
**Use Case:** Define multi-email drip campaigns

**Email Sequence Structure:**
```json
[
  {
    "day": 0,
    "subject": "Your Quiz Results: PROCESS Type",
    "template_name": "quiz_results_process",
    "from_name": "Marianna Vitale"
  },
  {
    "day": 3,
    "subject": "The homework battle that changed everything",
    "template_name": "story_1"
  }
]
```

---

### **9. email_logs**
**Purpose:** Track all sent emails  
**Key Fields:** `recipient_email`, `sequence_id`, `status`, `opened_at`, `clicked_at`  
**Use Case:** Monitor deliverability, track engagement

**Email Performance:**
```sql
SELECT 
  subject,
  COUNT(*) as sent,
  COUNT(opened_at) as opened,
  COUNT(clicked_at) as clicked,
  ROUND((COUNT(opened_at)::numeric / COUNT(*)::numeric) * 100, 2) as open_rate
FROM email_logs
WHERE sent_at > NOW() - INTERVAL '30 days'
GROUP BY subject
ORDER BY open_rate DESC;
```

---

### **10. social_accounts**
**Purpose:** Connected social media accounts  
**Key Fields:** `platform`, `access_token`, `status`, `auto_publish_enabled`  
**Use Case:** Store OAuth tokens, manage platform connections

**Platforms:**
- `facebook`
- `instagram`
- `pinterest`

---

### **11. analytics_daily**
**Purpose:** Daily aggregated analytics  
**Key Fields:** `date`, `posts_published`, `total_reach`, `revenue`  
**Use Case:** Dashboard metrics, trend analysis

**Example - Last 30 Days:**
```sql
SELECT 
  date,
  posts_published,
  total_reach,
  total_engagement,
  revenue
FROM analytics_daily
WHERE user_id = auth.uid()
AND date > CURRENT_DATE - INTERVAL '30 days'
ORDER BY date DESC;
```

---

### **12. webhook_logs**
**Purpose:** Track incoming webhooks  
**Key Fields:** `provider`, `event_type`, `payload`, `processed`  
**Use Case:** Debug webhooks from Stripe, Meta, Resend

**Providers:**
- `stripe` - Payment events
- `meta` - Facebook/Instagram webhooks
- `pinterest` - Pin analytics
- `resend` - Email delivery events

---

## 🔒 Row Level Security (RLS)

**All tables have RLS enabled!**

### **What This Means:**

✅ Users can only see/edit their own data  
✅ Public endpoints (quiz, orders) allow inserts  
✅ Backend uses service role key to bypass RLS  
✅ Secure by default  

### **RLS Policies:**

| Table | Select | Insert | Update | Delete |
|-------|--------|--------|--------|--------|
| **user_profiles** | Own only | Own only | Own only | ❌ |
| **content_calendar** | Own only | Own only | Own only | Own only |
| **scheduled_posts** | Own only | Own only | Own only | Own only |
| **published_posts** | Own only | Own only | ❌ | ❌ |
| **quiz_results** | ❌ Public | ✅ Public | ❌ | ❌ |
| **email_subscribers** | ❌ Public | ✅ Public | ❌ | ❌ |
| **orders** | ❌ Public | ✅ Public | ❌ | ❌ |
| **email_sequences** | Own only | Own only | Own only | Own only |
| **social_accounts** | Own only | Own only | Own only | Own only |
| **analytics_daily** | Own only | ❌ Backend | ❌ | ❌ |

**Note:** Backend edge functions use `SUPABASE_SERVICE_ROLE_KEY` which bypasses RLS.

---

## 📊 Useful Views

### **1. recent_orders_view**
**Purpose:** Orders with customer info  
**Use:** Sales dashboard

```sql
SELECT * FROM recent_orders_view LIMIT 20;
```

---

### **2. content_performance_view**
**Purpose:** Content analytics summary  
**Use:** See which posts performed best

```sql
SELECT * FROM content_performance_view 
WHERE total_reach > 1000
ORDER BY total_engagement DESC;
```

---

### **3. email_sequence_performance_view**
**Purpose:** Email campaign stats  
**Use:** Optimize email sequences

```sql
SELECT * FROM email_sequence_performance_view;
```

---

## 🔄 Common Workflows

### **Workflow 1: AI Content Generation**

```
1. AI generates content → INSERT into content_calendar (status = 'draft')
2. User reviews → UPDATE status = 'approved'
3. User schedules → INSERT into scheduled_posts
4. Cron job publishes → UPDATE scheduled_posts status = 'published'
5. Log published post → INSERT into published_posts
6. Sync analytics → UPDATE published_posts with metrics
```

---

### **Workflow 2: Quiz to Customer**

```
1. User takes quiz → INSERT into quiz_results
2. Trigger email sequence → INSERT into email_logs
3. User subscribes → INSERT into email_subscribers
4. User buys ebook → INSERT into orders
5. Update quiz_result → converted_to_customer = TRUE
```

---

### **Workflow 3: Email Automation**

```
1. Define sequence → INSERT into email_sequences
2. Trigger event (quiz completion) → Find matching sequence
3. Schedule emails → Calculate send times based on "day" field
4. Send via Resend → INSERT into email_logs
5. Track opens/clicks → UPDATE email_logs
```

---

## 🛠️ Maintenance Queries

### **Clean up old scheduled posts:**
```sql
DELETE FROM scheduled_posts
WHERE status = 'cancelled'
AND created_at < NOW() - INTERVAL '90 days';
```

---

### **Archive old webhook logs:**
```sql
DELETE FROM webhook_logs
WHERE processed = true
AND received_at < NOW() - INTERVAL '30 days';
```

---

### **Find inactive subscribers:**
```sql
SELECT email, last_opened_at
FROM email_subscribers
WHERE status = 'active'
AND (last_opened_at IS NULL OR last_opened_at < NOW() - INTERVAL '180 days');
```

---

## 📈 Analytics Queries

### **Total Revenue (Last 30 Days):**
```sql
SELECT SUM(amount) as total_revenue
FROM orders
WHERE payment_status = 'completed'
AND created_at > NOW() - INTERVAL '30 days';
```

---

### **Best Performing Content Type:**
```sql
SELECT 
  content_type,
  AVG(engagement_rate) as avg_engagement,
  COUNT(*) as posts_count
FROM published_posts pp
JOIN content_calendar cc ON pp.content_id = cc.id
GROUP BY content_type
ORDER BY avg_engagement DESC;
```

---

### **Conversion Rate (Quiz → Purchase):**
```sql
SELECT 
  COUNT(DISTINCT qr.email) as quiz_takers,
  COUNT(DISTINCT o.email) as customers,
  ROUND((COUNT(DISTINCT o.email)::numeric / COUNT(DISTINCT qr.email)::numeric) * 100, 2) as conversion_rate
FROM quiz_results qr
LEFT JOIN orders o ON qr.email = o.email AND o.payment_status = 'completed';
```

---

### **Email Open Rates by Sequence:**
```sql
SELECT 
  es.name,
  COUNT(el.id) as emails_sent,
  COUNT(el.opened_at) as emails_opened,
  ROUND((COUNT(el.opened_at)::numeric / COUNT(el.id)::numeric) * 100, 2) as open_rate
FROM email_sequences es
JOIN email_logs el ON el.sequence_id = es.id
GROUP BY es.name
ORDER BY open_rate DESC;
```

---

## 🚨 Troubleshooting

### **Error: "new row violates row-level security policy"**

**Cause:** Trying to insert/update data without proper auth  
**Fix:** Use service role key in backend, or ensure `auth.uid()` matches

---

### **Error: "duplicate key value violates unique constraint"**

**Cause:** Trying to insert duplicate data  
**Fix:** Check UNIQUE constraints:
- `user_profiles.user_id`
- `email_subscribers.email`
- `social_accounts` (user_id + platform + platform_user_id)

---

### **Slow Queries?**

**Check indexes:**
```sql
SELECT * FROM pg_indexes WHERE tablename = 'content_calendar';
```

All major query fields already have indexes! ✅

---

## 🎯 Next Steps

1. ✅ Run `/database-schema.sql` in Supabase SQL Editor
2. ✅ Verify all 12 tables created
3. ✅ Update your Edge Functions to use these tables
4. ✅ Test content generation workflow
5. ✅ Test quiz → email → order workflow
6. ✅ Deploy and GO LIVE! 🚀

---

## 💡 Pro Tips

**1. Use JSONB for flexibility**
- `quiz_results.responses` - Store full quiz data
- `email_sequences.emails` - Store email configs
- `analytics_daily.facebook_metrics` - Store platform-specific data

**2. Leverage array columns**
- `content_calendar.hashtags` - Easy to query with `ANY()`
- `email_subscribers.tags` - Segment users efficiently

**3. Use views for reporting**
- Pre-built views simplify complex queries
- Perfect for dashboards

**4. Monitor with webhook_logs**
- Debug payment issues (Stripe)
- Track email delivery (Resend)
- Monitor social publishing (Meta)

---

**Your database is production-ready! Time to scale to $1M! 💪📈🔥**
