# Google Scripts + Google Drive Setup (Preferred Simplified Stack)

If you want maximum simplicity, use this stack:
- **Frontend:** this Vite app
- **Checkout:** Shopify
- **Automation + storage:** Google Apps Script + Google Sheets + Google Drive

---

## 1) Use Google Drive as your asset hub

Create this folder structure in Drive:
1. `01-Ebook-Master`
2. `02-Bonus-Materials`
3. `03-Social-Creatives`
4. `04-Customer-Delivery`
5. `05-Testimonials`

Keep version naming simple:
- `ebook-v1.0.pdf`
- `ebook-v1.1.pdf`
- `bonus-pack-v1.0.zip`

---

## 2) Deploy the Apps Script endpoint

1. Open [script.new](https://script.new)
2. Paste contents of `scripts/google-apps-script/automation.gs`
3. In **Project Settings → Script properties**, add:
   - `LEADS_SHEET_ID` = your Google Sheet ID
   - `ADMIN_EMAIL` = optional alert email for publish queue reminders
4. Deploy:
   - **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Access: **Anyone with the link**
5. Copy deployment URL

Health check after deploy:
- Open the web app URL in browser
- Expected response: `{"ok":true,"service":"ebook-automation","status":"healthy"...}`

---

## 3) Connect app to Google Script

`src/config.ts` is already wired with your provided web app URL:
- `GOOGLE_AUTOMATION_CONFIG.webAppUrl`

Also set:
- `GOOGLE_AUTOMATION_CONFIG.driveFolderUrl`
- `GOOGLE_AUTOMATION_CONFIG.leadSheetUrl`

Once set, `trackEvent` sends events to your Apps Script endpoint.

---

## 4) Required Apps Script functions

These are the functions you should keep in Apps Script for this project:

1. `doGet()`
   - Health endpoint for deployment verification.
2. `doPost(e)`
   - Receives frontend events (`checkout_started`, `checkout_error`, etc.) and writes to Sheets.
   - Also supports queue upsert payloads (`type: "publish_queue_upsert"`).
3. `installAutomationTriggers()`
   - One-time setup function to create daily triggers.
4. `dailyPublishQueueAudit()`
   - Finds due scheduled posts and emails reminders.
5. `dailyKpiSnapshot()`
   - Daily summary row for checkout KPI counts.

Utility functions:
- `upsertPublishQueue_()`
- `getOrCreateSheet_()`
- `getRequiredProperty_()`
- `safe_()`
- `json()`

---

## 5) Required triggers

Create installable triggers by running `installAutomationTriggers()` once.

Expected triggers:
- `dailyPublishQueueAudit` — **time-driven daily** (8 AM)
- `dailyKpiSnapshot` — **time-driven daily** (8 AM)

Why these matter:
- You get daily publishing reminders from your `publish_queue` sheet.
- You get a daily KPI row to track trendline performance toward revenue goals.

---

## 6) Required sheet tabs and columns

The script will auto-create missing tabs, but use these names:

- `leads`:
  - `timestamp, eventName, email, name, page, payload`
- `events`:
  - `timestamp, eventName, email, name, page, payload`
- `publish_queue`:
  - `day, platform, asset_drive_url, caption, cta_url, publish_datetime, status`
- `kpi_daily`:
  - `date, checkout_started, checkout_started_shopify, checkout_error`

---

## 7) Shopify + Google automation connection

- Keep checkout in Shopify (for reliability)
- Use this app for story + conversion pages
- Send key events to Google Sheets:
  - `checkout_started`
  - `checkout_started_shopify`
  - `checkout_error`

Build one weekly KPI summary from `kpi_daily`:
- sessions
- checkout starts
- purchases
- AOV
- conversion rate

---

## 8) Sales optimization (simple + scalable)

1. Improve hero clarity and CTA first
2. Keep one primary offer + one order bump
3. Use weekly creative refresh from top 3 posts
4. Keep visuals emotionally real and human-first:
   - hyper-real/Pixar-style lighting
   - cyberpunk accents only where it improves attention
   - avoid uncanny AI artifacts

---

## 9) Operating rhythm

- **Daily (30 min):** check leads/events sheet + respond to buyers + publish queue audit
- **Weekly (60 min):** review KPI sheet and replace low-performing creative
- **Monthly (2 hours):** update offer stack and testimonials

This keeps your system lean while supporting growth toward a $1M ebook business.
