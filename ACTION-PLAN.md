# Now What? (Execution Plan)

This is the **practical next-step plan** to move from "repo exists" to "selling daily".

## 0) Run it and verify pages (today)

```bash
npm install
npm run dev
```

Open the key pages in your browser and verify each one renders:
- Ebook: `/`
- Quiz: `/quiz`
- Sales page: `/sales`
- Checkout: `/checkout`
- Thank-you/upsell: `/thank-you`
- Dashboard/automation: `/dashboard`

Then run a production check:

```bash
npm run build
```

---

## 1) Simplify the stack (this week)

Keep only 4 moving parts:
1. **This app (Vite + React)** for storytelling and conversion pages
2. **Shopify** for products, checkout, payments
3. **Google Apps Script + Sheets + Drive** for automation, tracking, and asset ops
4. **Canva** for repeatable design exports

Reference docs already in this repo:
- Setup flow: `src/START-HERE.md`
- Full automation setup: `src/FULL-AUTOMATION-SETUP.md`
- Launch workflow: `src/LAUNCH-CHECKLIST.md`
- Google setup: `GOOGLE-SCRIPTS-DRIVE-SETUP.md`
- Apps Script template: `scripts/google-apps-script/automation.gs`

---

## 2) Connect files into one sales system

## Funnel wiring
- **Traffic content** uses `src/30-DAY-CONTENT-CALENDAR.md`
- Traffic lands on **Quiz** (`src/Quiz.tsx`) or **Sales** (`src/SalesPage.tsx`)
- **Checkout** step (`src/Checkout.tsx`) routes to Shopify product/checkout URL
- **Thank-you** page (`src/ThankYou.tsx`) delivers upsell/bonus pathway
- **Dashboard** (`src/MarketingDashboard.tsx`) tracks campaign performance and scheduling

## Offer packaging
- Core product: ebook from `src/App.tsx`
- Bonuses: `src/BonusMaterials.tsx`
- Print-friendly add-on: `src/PrintVersion.tsx`

---

## 3) Automation priorities (highest ROI)

1. Daily scheduled post publishing (Meta + Pinterest)
2. Abandoned cart reminders + post-purchase upsell flow
3. Weekly funnel report (sessions, add-to-cart, checkout start, purchase)
4. Creative refresh automation (new hooks + thumbnails from top winners)

Use these docs as implementation specs:
- `src/README-AUTOMATION.md`
- `src/META-API-QUICK-SETUP.md`
- `src/CANVA-AUTOMATION-SETUP.md`

---

## 4) Creative direction guardrails (for $1M scaling)

When generating or approving graphics:
- Keep **human emotional realism** first (connection > effects)
- Use **Pixar-inspired lighting** and clear character expressions
- Use cyberpunk accents in moderation (cyan/magenta/violet), not full neon overload
- Reject visuals with obvious AI artifacts (hands, eyes, texture glitches)
- Always preserve CTA readability and whitespace

Add these checks to design QA before publishing.

---

## 5) KPI targets to watch weekly

- Conversion rate (landing → purchase)
- AOV (with bundle/upsell)
- CAC and MER/ROAS
- Refund rate
- Email revenue share
- Upsell take rate

If conversion drops, improve headline clarity and checkout trust blocks first.

---

## 6) 72-hour action sprint

### Day 1
- Deploy frontend (Vercel/Netlify)
- Connect Shopify buy button/checkout links
- Verify all funnel pages and CTAs

### Day 2
- Publish first 7 content pieces from calendar
- Enable scheduler in dashboard
- Add UTMs to every CTA and social link

### Day 3
- Review first analytics signals
- Adjust one variable only (headline OR creative OR offer)
- Lock in the best performer for next 7 days

---

## 7) What to build next in code

1. Add a centralized `config.ts` for all product URLs, CTA destinations, and platform links.
2. Add event tracking helper (`track(eventName, payload)`) used across Quiz/Sales/Checkout/ThankYou.
3. Add a single source-of-truth content JSON for campaign metadata (platform, hook, asset, CTA URL).
4. Add a lightweight QA checklist component in Dashboard before posts can be published.

These 4 additions will improve reliability, reporting clarity, and scaling speed.
