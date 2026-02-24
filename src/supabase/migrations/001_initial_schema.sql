-- STOP HOMEWORK BATTLES - Database Schema
-- Marketing Automation System with Resend + Canva + Stripe

-- CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  quiz_results JSONB,
  quiz_score TEXT, -- "process", "capacity", "emotional", "executive_function"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB
);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL, -- "ebook", "bundle", "coaching", "upsell"
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending', -- "pending", "completed", "refunded", "failed"
  stripe_payment_intent_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::JSONB
);

-- EMAIL SEQUENCES TABLE
CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  sequence_type TEXT NOT NULL, -- "quiz_result", "purchase", "abandoned_cart", "upsell"
  email_number INTEGER DEFAULT 1,
  status TEXT DEFAULT 'scheduled', -- "scheduled", "sent", "opened", "clicked", "bounced"
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  resend_email_id TEXT,
  metadata JSONB DEFAULT '{}'::JSONB
);

-- QUIZ RESPONSES TABLE
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  responses JSONB NOT NULL,
  result_type TEXT NOT NULL, -- "process", "capacity", "emotional", "executive_function"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ANALYTICS EVENTS TABLE
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- "page_view", "quiz_start", "quiz_complete", "purchase", "email_open", "email_click"
  customer_id UUID REFERENCES customers(id),
  event_data JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GENERATED CONTENT TABLE (Canva API)
CREATE TABLE IF NOT EXISTS generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- "social_post", "ad_creative", "quiz_result_graphic", "testimonial"
  customer_id UUID REFERENCES customers(id),
  canva_design_id TEXT,
  export_url TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ADMIN SETTINGS TABLE
CREATE TABLE IF NOT EXISTS admin_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_email_sequences_customer_id ON email_sequences(customer_id);
CREATE INDEX IF NOT EXISTS idx_email_sequences_status ON email_sequences(status);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

-- Insert default admin settings
INSERT INTO admin_settings (key, value) VALUES
  ('pricing', '{"ebook": 4700, "bundle": 9700, "coaching": 29700}'::JSONB),
  ('email_sequences_enabled', 'true'::JSONB),
  ('canva_automation_enabled', 'true'::JSONB),
  ('launch_date', '"2026-02-15"'::JSONB)
ON CONFLICT (key) DO NOTHING;
