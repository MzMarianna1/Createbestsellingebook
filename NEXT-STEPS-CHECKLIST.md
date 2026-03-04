# What Do I Do Next? (Practical Checklist)

Use this in order. Do not skip steps.

## Phase 1 — Go Live Fast (Today, 60–90 min)

### 1) Run and verify the app
```bash
npm install
npm run dev
```
Check these URLs locally:
- `/`
- `/sales`
- `/quiz`
- `/checkout`
- `/thank-you`
- `/dashboard`

### 2) Build for production
```bash
npm run build
```
If this passes, deploy to Vercel or Netlify.

### 3) Configure integration values
Edit `src/config.ts`:
- Add Shopify checkout URLs (`SHOPIFY_CONFIG`)
- Add Google Apps Script Web App URL (`GOOGLE_AUTOMATION_CONFIG.webAppUrl`)
- Add Google Drive + Sheets links for your team

When `SHOPIFY_CONFIG` URLs are set, checkout will redirect directly to Shopify.
If they are not set, checkout uses the existing Supabase/Stripe flow.

### 4) Deploy Apps Script endpoint
Follow:
- `GOOGLE-SCRIPTS-DRIVE-SETUP.md`
- `scripts/google-apps-script/automation.gs`

Goal: events from checkout land in Google Sheets.

---

## Phase 2 — Connect Sales Funnel (Next 24 hours)

### 5) Wire final CTAs to Shopify
Primary funnel:
1. Social post → `/sales`
2. `/sales` CTA → `/checkout`
3. `/checkout` payment → Shopify
4. Success returns to `/thank-you`

### 6) Add campaign tracking discipline
For every campaign, append UTM tags:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`

Keep a single campaign naming sheet in Google Drive.

### 7) Set one offer ladder
- Core ebook
- Bundle upsell
- Coaching premium

Keep this simple and stable for 2 weeks before changing price.

---

## Phase 3 — Automate + Optimize (Days 2–7)

### 8) Content engine (simple)
Use `src/30-DAY-CONTENT-CALENDAR.md`:
- Publish 1 post/day
- 80% parent pain + transformation content
- 20% direct offer CTA

Generate your first 7 design briefs + prompts:
```bash
node scripts/generate-social-pack.mjs
```
Then follow `SOCIAL-GRAPHICS-LAUNCH.md`.

### 9) Creative quality standard (non-AI-looking)
Before publishing each creative, verify:
- Human emotional expression is clear
- Hyper-real / Pixar-like lighting depth
- Cyberpunk accents are limited to highlight zones
- No AI artifacts (hands/eyes/texture glitches)
- CTA remains readable on mobile

### 10) Weekly KPI review in Google Sheets
Track minimum metrics:
- Sessions
- Checkout starts
- Purchases
- Conversion rate
- AOV
- Refund rate

If conversion drops: improve headline and checkout trust first.

---

## Phase 4 — $1M Scaling Logic

### 11) Math target
- $1,000,000 annual target
- If AOV is $47, target orders ≈ 21,277/year
- ≈ 58 orders/day average

### 12) Scaling rules
- Change one variable per test (headline OR creative OR offer)
- Keep winner running 7 days minimum
- Replace only lowest-performing 20% creatives weekly

---

## Daily Operating Rhythm (30 minutes)
1. Check Google Sheet events
2. Respond to buyer questions
3. Post or approve 1 creative
4. Log one insight in campaign notes

## Weekly Operating Rhythm (60 minutes)
1. Review funnel KPIs
2. Pick one bottleneck
3. Ship one improvement
4. Archive old tests and keep SOP updated
