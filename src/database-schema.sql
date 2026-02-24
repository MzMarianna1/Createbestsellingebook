-- =====================================================
-- STOP HOMEWORK BATTLES - PRODUCTION DATABASE SCHEMA
-- =====================================================
-- For use with Supabase PostgreSQL
-- Includes: Content automation, lead gen, sales, analytics
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE 1: USER PROFILES
-- =====================================================
-- Extended user information beyond Supabase auth
-- Links to auth.users via user_id

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  business_name TEXT DEFAULT 'Mz. Marianna''s Learning Kingdom',
  website_url TEXT DEFAULT 'www.MzMarianna.com',
  quiz_url TEXT DEFAULT 'www.MzMarianna.com/quiz',
  
  -- Subscription & billing
  subscription_tier TEXT DEFAULT 'free', -- free, starter, pro, enterprise
  subscription_status TEXT DEFAULT 'active', -- active, cancelled, expired
  stripe_customer_id TEXT,
  
  -- Settings
  timezone TEXT DEFAULT 'America/New_York',
  default_post_times JSONB DEFAULT '{"facebook": "09:00", "instagram": "12:00", "pinterest": "15:00"}',
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  
  -- Indexes
  CONSTRAINT valid_subscription_tier CHECK (subscription_tier IN ('free', 'starter', 'pro', 'enterprise')),
  CONSTRAINT valid_subscription_status CHECK (subscription_status IN ('active', 'cancelled', 'expired', 'past_due'))
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_subscription_tier ON user_profiles(subscription_tier);

-- =====================================================
-- TABLE 2: CONTENT CALENDAR
-- =====================================================
-- AI-generated content for 30-day calendars

CREATE TABLE IF NOT EXISTS content_calendar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Content metadata
  day_number INTEGER NOT NULL, -- 1-30
  scheduled_date DATE,
  
  -- Content details
  content_type TEXT NOT NULL, -- educational, motivational, inspirational, entertaining, promotional
  format_type TEXT NOT NULL, -- carousel, reel, story, feed_post, overlay
  
  -- AI-generated content
  hook TEXT NOT NULL,
  caption TEXT NOT NULL,
  visual_prompt TEXT NOT NULL,
  hashtags TEXT[], -- Array of hashtags
  
  -- Story structure
  challenge_section TEXT,
  solution_section TEXT,
  results_section TEXT,
  closing_section TEXT,
  
  -- Design assets
  canva_design_id TEXT,
  canva_design_url TEXT,
  image_urls TEXT[], -- Array of exported image URLs
  
  -- Publishing
  status TEXT DEFAULT 'draft', -- draft, approved, scheduled, published, failed
  published_at TIMESTAMPTZ,
  platforms TEXT[] DEFAULT '{}', -- facebook, instagram, pinterest
  
  -- Analytics (populated after publishing)
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagement INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_content_type CHECK (content_type IN ('educational', 'motivational', 'inspirational', 'entertaining', 'promotional', 'lifestyle')),
  CONSTRAINT valid_format_type CHECK (format_type IN ('carousel', 'reel', 'story', 'feed_post', 'overlay')),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'approved', 'scheduled', 'published', 'failed'))
);

CREATE INDEX idx_content_calendar_user_id ON content_calendar(user_id);
CREATE INDEX idx_content_calendar_scheduled_date ON content_calendar(scheduled_date);
CREATE INDEX idx_content_calendar_status ON content_calendar(status);
CREATE INDEX idx_content_calendar_day_number ON content_calendar(day_number);

-- =====================================================
-- TABLE 3: SCHEDULED POSTS
-- =====================================================
-- Posts scheduled for future publishing

CREATE TABLE IF NOT EXISTS scheduled_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES content_calendar(id) ON DELETE CASCADE,
  
  -- Scheduling
  platform TEXT NOT NULL, -- facebook, instagram, pinterest
  scheduled_time TIMESTAMPTZ NOT NULL,
  
  -- Post details
  caption TEXT NOT NULL,
  image_url TEXT,
  hashtags TEXT[],
  
  -- Status tracking
  status TEXT DEFAULT 'pending', -- pending, processing, published, failed, cancelled
  error_message TEXT,
  
  -- Platform-specific data
  platform_post_id TEXT, -- ID from Facebook/Instagram/Pinterest after publishing
  platform_permalink TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  
  -- Constraints
  CONSTRAINT valid_platform CHECK (platform IN ('facebook', 'instagram', 'pinterest')),
  CONSTRAINT valid_scheduled_status CHECK (status IN ('pending', 'processing', 'published', 'failed', 'cancelled'))
);

CREATE INDEX idx_scheduled_posts_user_id ON scheduled_posts(user_id);
CREATE INDEX idx_scheduled_posts_scheduled_time ON scheduled_posts(scheduled_time);
CREATE INDEX idx_scheduled_posts_status ON scheduled_posts(status);
CREATE INDEX idx_scheduled_posts_platform ON scheduled_posts(platform);

-- =====================================================
-- TABLE 4: PUBLISHED POSTS
-- =====================================================
-- Archive of all published posts with analytics

CREATE TABLE IF NOT EXISTS published_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES content_calendar(id) ON DELETE SET NULL,
  
  -- Post details
  platform TEXT NOT NULL,
  platform_post_id TEXT NOT NULL,
  platform_permalink TEXT,
  
  caption TEXT,
  image_url TEXT,
  post_type TEXT, -- photo, video, carousel, story
  
  -- Publishing info
  published_at TIMESTAMPTZ NOT NULL,
  
  -- Analytics (synced from platform APIs)
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  engagement_rate NUMERIC(5,2) DEFAULT 0.00, -- Percentage
  
  -- Analytics last updated
  analytics_last_synced_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_published_platform CHECK (platform IN ('facebook', 'instagram', 'pinterest'))
);

CREATE INDEX idx_published_posts_user_id ON published_posts(user_id);
CREATE INDEX idx_published_posts_platform ON published_posts(platform);
CREATE INDEX idx_published_posts_published_at ON published_posts(published_at);
CREATE INDEX idx_published_posts_engagement_rate ON published_posts(engagement_rate);

-- =====================================================
-- TABLE 5: QUIZ RESULTS
-- =====================================================
-- Lead generation from parenting scaffold quiz

CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Lead information
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  
  -- Quiz responses
  quiz_type TEXT DEFAULT 'parenting_scaffold', -- parenting_scaffold, homework_resistance, etc
  responses JSONB NOT NULL, -- Full quiz response data
  
  -- Results
  primary_scaffold_type TEXT NOT NULL, -- process, capacity, emotional
  secondary_scaffold_type TEXT,
  quiz_score JSONB, -- Detailed scoring breakdown
  
  -- Lead status
  lead_status TEXT DEFAULT 'new', -- new, contacted, converted, unsubscribed
  lead_source TEXT, -- facebook, instagram, pinterest, organic, referral
  
  -- Follow-up
  email_sequence_started BOOLEAN DEFAULT FALSE,
  email_sequence_name TEXT,
  last_email_sent_at TIMESTAMPTZ,
  
  -- Conversion tracking
  converted_to_customer BOOLEAN DEFAULT FALSE,
  converted_at TIMESTAMPTZ,
  order_id UUID, -- Links to orders table
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  
  CONSTRAINT valid_scaffold_type CHECK (primary_scaffold_type IN ('process', 'capacity', 'emotional')),
  CONSTRAINT valid_lead_status CHECK (lead_status IN ('new', 'contacted', 'converted', 'unsubscribed'))
);

CREATE INDEX idx_quiz_results_email ON quiz_results(email);
CREATE INDEX idx_quiz_results_scaffold_type ON quiz_results(primary_scaffold_type);
CREATE INDEX idx_quiz_results_lead_status ON quiz_results(lead_status);
CREATE INDEX idx_quiz_results_created_at ON quiz_results(created_at);
CREATE INDEX idx_quiz_results_converted ON quiz_results(converted_to_customer);

-- =====================================================
-- TABLE 6: EMAIL SUBSCRIBERS
-- =====================================================
-- Email list management

CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Subscriber info
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  
  -- Subscription status
  status TEXT DEFAULT 'active', -- active, unsubscribed, bounced, complained
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  
  -- Source tracking
  source TEXT, -- quiz, freebie, sales_page, popup, manual
  source_url TEXT,
  quiz_result_id UUID REFERENCES quiz_results(id),
  
  -- Segmentation
  tags TEXT[] DEFAULT '{}', -- homeschooler, adhd, dyslexia, gifted, etc
  scaffold_type TEXT, -- process, capacity, emotional
  
  -- Email preferences
  preferences JSONB DEFAULT '{"weekly_tips": true, "product_updates": true, "promotions": true}',
  
  -- Engagement tracking
  emails_sent INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  last_opened_at TIMESTAMPTZ,
  last_clicked_at TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_subscriber_status CHECK (status IN ('active', 'unsubscribed', 'bounced', 'complained'))
);

CREATE INDEX idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX idx_email_subscribers_status ON email_subscribers(status);
CREATE INDEX idx_email_subscribers_scaffold_type ON email_subscribers(scaffold_type);
CREATE INDEX idx_email_subscribers_tags ON email_subscribers USING GIN(tags);

-- =====================================================
-- TABLE 7: ORDERS
-- =====================================================
-- Ebook purchases and transactions

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Customer info
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  quiz_result_id UUID REFERENCES quiz_results(id),
  subscriber_id UUID REFERENCES email_subscribers(id),
  
  -- Order details
  product_name TEXT NOT NULL, -- "Stop Homework Battles Ebook", "Premium Bundle", etc
  product_sku TEXT,
  package_type TEXT, -- standard, premium, deluxe
  
  -- Pricing
  amount NUMERIC(10,2) NOT NULL, -- Total amount in dollars
  currency TEXT DEFAULT 'USD',
  discount_code TEXT,
  discount_amount NUMERIC(10,2) DEFAULT 0.00,
  
  -- Payment
  payment_provider TEXT DEFAULT 'stripe', -- stripe, gumroad, paypal
  payment_status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  
  -- Fulfillment
  fulfillment_status TEXT DEFAULT 'pending', -- pending, delivered, failed
  download_link TEXT,
  download_expires_at TIMESTAMPTZ,
  download_count INTEGER DEFAULT 0,
  
  -- Upsells
  accepted_upsell BOOLEAN DEFAULT FALSE,
  upsell_product TEXT,
  upsell_amount NUMERIC(10,2),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  ip_address INET,
  
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  CONSTRAINT valid_fulfillment_status CHECK (fulfillment_status IN ('pending', 'delivered', 'failed'))
);

CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_stripe_payment_intent ON orders(stripe_payment_intent_id);

-- =====================================================
-- TABLE 8: EMAIL SEQUENCES
-- =====================================================
-- Automated email campaign definitions

CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Sequence info
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL, -- quiz_completion, purchase, manual, tag_added
  
  -- Status
  status TEXT DEFAULT 'active', -- active, paused, archived
  
  -- Emails in sequence (ordered array of email configs)
  emails JSONB NOT NULL, 
  -- Format: [
  --   {
  --     "day": 0,
  --     "subject": "Welcome! Your quiz results inside...",
  --     "template_name": "quiz_results_process",
  --     "from_name": "Marianna Vitale",
  --     "from_email": "marianna@mzmarianna.com"
  --   },
  --   {
  --     "day": 3,
  --     "subject": "The homework battle that changed everything",
  --     "template_name": "story_email_1",
  --     ...
  --   }
  -- ]
  
  -- Stats
  total_subscribers INTEGER DEFAULT 0,
  total_sent INTEGER DEFAULT 0,
  total_opened INTEGER DEFAULT 0,
  total_clicked INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_trigger_type CHECK (trigger_type IN ('quiz_completion', 'purchase', 'manual', 'tag_added', 'signup')),
  CONSTRAINT valid_sequence_status CHECK (status IN ('active', 'paused', 'archived'))
);

CREATE INDEX idx_email_sequences_user_id ON email_sequences(user_id);
CREATE INDEX idx_email_sequences_status ON email_sequences(status);

-- =====================================================
-- TABLE 9: EMAIL LOGS
-- =====================================================
-- Track all sent emails

CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Email details
  recipient_email TEXT NOT NULL,
  subscriber_id UUID REFERENCES email_subscribers(id),
  
  -- Email content
  subject TEXT NOT NULL,
  from_name TEXT,
  from_email TEXT,
  
  -- Sequence tracking
  sequence_id UUID REFERENCES email_sequences(id),
  sequence_email_index INTEGER, -- Which email in the sequence (0-based)
  
  -- Provider
  email_provider TEXT DEFAULT 'resend', -- resend, sendgrid, mailgun
  provider_message_id TEXT,
  
  -- Status
  status TEXT DEFAULT 'sent', -- sent, delivered, opened, clicked, bounced, complained
  
  -- Engagement
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  clicked_links TEXT[], -- Array of URLs clicked
  
  -- Errors
  error_message TEXT,
  bounced_at TIMESTAMPTZ,
  bounce_type TEXT, -- hard, soft
  
  -- Metadata
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_email_status CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'failed'))
);

CREATE INDEX idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX idx_email_logs_subscriber_id ON email_logs(subscriber_id);
CREATE INDEX idx_email_logs_sequence_id ON email_logs(sequence_id);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at);
CREATE INDEX idx_email_logs_status ON email_logs(status);

-- =====================================================
-- TABLE 10: SOCIAL ACCOUNTS
-- =====================================================
-- Connected social media accounts

CREATE TABLE IF NOT EXISTS social_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Platform details
  platform TEXT NOT NULL, -- facebook, instagram, pinterest
  platform_user_id TEXT NOT NULL,
  platform_username TEXT,
  
  -- OAuth tokens
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  
  -- Account info
  profile_picture_url TEXT,
  followers_count INTEGER,
  
  -- Status
  status TEXT DEFAULT 'active', -- active, expired, revoked, error
  last_sync_at TIMESTAMPTZ,
  error_message TEXT,
  
  -- Publishing settings
  auto_publish_enabled BOOLEAN DEFAULT FALSE,
  default_hashtags TEXT[],
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_social_platform CHECK (platform IN ('facebook', 'instagram', 'pinterest')),
  CONSTRAINT valid_social_status CHECK (status IN ('active', 'expired', 'revoked', 'error')),
  CONSTRAINT unique_platform_account UNIQUE(user_id, platform, platform_user_id)
);

CREATE INDEX idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);
CREATE INDEX idx_social_accounts_status ON social_accounts(status);

-- =====================================================
-- TABLE 11: ANALYTICS DAILY
-- =====================================================
-- Daily aggregated analytics

CREATE TABLE IF NOT EXISTS analytics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Date
  date DATE NOT NULL,
  
  -- Content metrics
  posts_published INTEGER DEFAULT 0,
  posts_scheduled INTEGER DEFAULT 0,
  
  -- Social media metrics
  total_reach INTEGER DEFAULT 0,
  total_impressions INTEGER DEFAULT 0,
  total_likes INTEGER DEFAULT 0,
  total_comments INTEGER DEFAULT 0,
  total_shares INTEGER DEFAULT 0,
  total_saves INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  avg_engagement_rate NUMERIC(5,2) DEFAULT 0.00,
  
  -- Platform breakdown
  facebook_metrics JSONB DEFAULT '{}',
  instagram_metrics JSONB DEFAULT '{}',
  pinterest_metrics JSONB DEFAULT '{}',
  
  -- Lead gen metrics
  quiz_completions INTEGER DEFAULT 0,
  new_subscribers INTEGER DEFAULT 0,
  
  -- Sales metrics
  orders_count INTEGER DEFAULT 0,
  revenue NUMERIC(10,2) DEFAULT 0.00,
  
  -- Email metrics
  emails_sent INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_user_date UNIQUE(user_id, date)
);

CREATE INDEX idx_analytics_daily_user_id ON analytics_daily(user_id);
CREATE INDEX idx_analytics_daily_date ON analytics_daily(date);

-- =====================================================
-- TABLE 12: WEBHOOK LOGS
-- =====================================================
-- Track incoming webhooks from Stripe, Meta, etc

CREATE TABLE IF NOT EXISTS webhook_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Webhook details
  provider TEXT NOT NULL, -- stripe, meta, pinterest, resend
  event_type TEXT NOT NULL,
  
  -- Payload
  payload JSONB NOT NULL,
  headers JSONB,
  
  -- Processing
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  error_message TEXT,
  
  -- Metadata
  received_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET
);

CREATE INDEX idx_webhook_logs_provider ON webhook_logs(provider);
CREATE INDEX idx_webhook_logs_processed ON webhook_logs(processed);
CREATE INDEX idx_webhook_logs_received_at ON webhook_logs(received_at);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE published_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

-- User Profiles: Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Content Calendar: Users can only see/manage their own content
CREATE POLICY "Users can view own content" ON content_calendar
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content" ON content_calendar
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content" ON content_calendar
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content" ON content_calendar
  FOR DELETE USING (auth.uid() = user_id);

-- Scheduled Posts: Users can only see/manage their own scheduled posts
CREATE POLICY "Users can view own scheduled posts" ON scheduled_posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scheduled posts" ON scheduled_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scheduled posts" ON scheduled_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scheduled posts" ON scheduled_posts
  FOR DELETE USING (auth.uid() = user_id);

-- Published Posts: Users can only see their own published posts
CREATE POLICY "Users can view own published posts" ON published_posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own published posts" ON published_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Quiz Results: Public can insert, admin can view all
CREATE POLICY "Anyone can submit quiz results" ON quiz_results
  FOR INSERT WITH CHECK (true);

-- For now, make quiz results readable by service role only (backend handles this)
-- In production, you might want authenticated users to view their own leads

-- Email Subscribers: Public can insert, admin can view all
CREATE POLICY "Anyone can subscribe" ON email_subscribers
  FOR INSERT WITH CHECK (true);

-- Orders: Public can insert, users can view their own
CREATE POLICY "Anyone can create order" ON orders
  FOR INSERT WITH CHECK (true);

-- Email Sequences: Users can manage their own sequences
CREATE POLICY "Users can view own sequences" ON email_sequences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sequences" ON email_sequences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sequences" ON email_sequences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sequences" ON email_sequences
  FOR DELETE USING (auth.uid() = user_id);

-- Email Logs: Read-only for admin
-- Service role handles inserts

-- Social Accounts: Users can manage their own connected accounts
CREATE POLICY "Users can view own social accounts" ON social_accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own social accounts" ON social_accounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own social accounts" ON social_accounts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own social accounts" ON social_accounts
  FOR DELETE USING (auth.uid() = user_id);

-- Analytics: Users can view their own analytics
CREATE POLICY "Users can view own analytics" ON analytics_daily
  FOR SELECT USING (auth.uid() = user_id);

-- Webhook Logs: Service role only
-- No RLS policies needed (handled server-side)

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_calendar_updated_at BEFORE UPDATE ON content_calendar
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_subscribers_updated_at BEFORE UPDATE ON email_subscribers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_sequences_updated_at BEFORE UPDATE ON email_sequences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_accounts_updated_at BEFORE UPDATE ON social_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA / SEED DATA
-- =====================================================

-- Insert default email sequence for quiz completions
-- (Run this manually or via migration after user signup)

-- Example:
-- INSERT INTO email_sequences (user_id, name, trigger_type, emails) VALUES
-- (
--   'YOUR_USER_ID_HERE',
--   'Quiz Welcome Sequence - Process Type',
--   'quiz_completion',
--   '[
--     {
--       "day": 0,
--       "subject": "Your Homework Resistance Type: PROCESS",
--       "template_name": "quiz_results_process"
--     },
--     {
--       "day": 1,
--       "subject": "The day I realized homework wasn't the problem",
--       "template_name": "story_process_1"
--     },
--     {
--       "day": 3,
--       "subject": "Why 'just try harder' backfires for Process kids",
--       "template_name": "educational_process_1"
--     }
--   ]'::jsonb
-- );

-- =====================================================
-- VIEWS (OPTIONAL - FOR REPORTING)
-- =====================================================

-- View: Recent orders with customer info
CREATE OR REPLACE VIEW recent_orders_view AS
SELECT 
  o.id,
  o.email,
  o.first_name,
  o.last_name,
  o.product_name,
  o.amount,
  o.payment_status,
  o.created_at,
  es.status as subscriber_status,
  qr.primary_scaffold_type
FROM orders o
LEFT JOIN email_subscribers es ON o.email = es.email
LEFT JOIN quiz_results qr ON o.email = qr.email
ORDER BY o.created_at DESC;

-- View: Content performance summary
CREATE OR REPLACE VIEW content_performance_view AS
SELECT 
  cc.id,
  cc.day_number,
  cc.content_type,
  cc.format_type,
  cc.hook,
  cc.status,
  cc.published_at,
  COALESCE(SUM(pp.reach), 0) as total_reach,
  COALESCE(SUM(pp.engagement_rate), 0) as total_engagement,
  COUNT(pp.id) as platforms_published
FROM content_calendar cc
LEFT JOIN published_posts pp ON cc.id = pp.content_id
GROUP BY cc.id
ORDER BY cc.day_number;

-- View: Email sequence performance
CREATE OR REPLACE VIEW email_sequence_performance_view AS
SELECT 
  es.id,
  es.name,
  es.total_sent,
  es.total_opened,
  es.total_clicked,
  CASE 
    WHEN es.total_sent > 0 THEN ROUND((es.total_opened::numeric / es.total_sent::numeric) * 100, 2)
    ELSE 0
  END as open_rate,
  CASE 
    WHEN es.total_sent > 0 THEN ROUND((es.total_clicked::numeric / es.total_sent::numeric) * 100, 2)
    ELSE 0
  END as click_rate
FROM email_sequences es
WHERE es.status = 'active'
ORDER BY es.total_sent DESC;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- Run this SQL in Supabase SQL Editor:
-- 1. Go to Supabase Dashboard
-- 2. Click "SQL Editor"
-- 3. Click "New Query"
-- 4. Paste this entire file
-- 5. Click "Run"
-- 
-- This will create all tables, indexes, RLS policies, and functions
-- needed for your production-ready system!
-- 
-- Next steps:
-- 1. Deploy your Edge Functions
-- 2. Add OPENAI_API_KEY to secrets
-- 3. Start generating content!
-- =====================================================

SELECT 'Database schema created successfully! 🎉' as status;
