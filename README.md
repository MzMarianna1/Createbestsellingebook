# Create Best Selling Ebook

A Vite + React project for publishing and selling a premium children's/parenting ebook funnel, with content automation docs included.

## 1) Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## 2) Host it fast (recommended)

### Option A — Vercel (fastest)
1. Push this repo to GitHub.
2. In Vercel, click **New Project** and import the repo.
3. Framework preset: **Vite**.
4. Build command: `npm run build`
5. Output directory: `build`
6. Deploy.

### Option B — Netlify
1. Connect repo in Netlify.
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy.

## 3) Connect to Shopify for sales

Use this app as your branded sales + lead funnel and route checkout to Shopify:

- Add **Buy Button** embeds for ebook products.
- Use Shopify Checkout + post-purchase upsells.
- Track every CTA click with UTM and event names.

## 4) What to do next

Read the execution blueprint in:

- `GROWTH-HOSTING-ROADMAP.md` (hosting + $1M roadmap + automation stack)
- `src/START-HERE.md` (project-specific setup flow)
- `src/DEPLOY-COMMANDS.md` (Supabase deployment commands)

## 5) Now what?

Use `ACTION-PLAN.md` for a concrete 72-hour execution sprint that connects this repo
to Shopify sales, automation setup, and creative optimization.


## 6) Simplest automation option (Google-first)

If you prefer Google tools, use:
- `GOOGLE-SCRIPTS-DRIVE-SETUP.md`
- `scripts/google-apps-script/automation.gs`

This gives you lightweight automation with Google Sheets/Drive while still using Shopify for checkout.


## 7) Exactly what to do next

Start with `NEXT-STEPS-CHECKLIST.md` for the 60–90 minute go-live plan, then run:

```bash
./scripts/validate-setup.sh
```

This verifies your Google-first + Shopify setup files and route wiring.


## 8) Start pushing social graphics now

Run:

```bash
node scripts/generate-social-pack.mjs
```

Then follow `SOCIAL-GRAPHICS-LAUNCH.md` to batch-produce in Canva, store in Google Drive, and schedule publish queue rows in Google Sheets.


## 9) End-to-end automation quickstart

1. Set real Shopify URLs in `src/config.ts` (`SHOPIFY_CONFIG`).
2. Set your Apps Script URL in `src/config.ts` (`GOOGLE_AUTOMATION_CONFIG.webAppUrl`).
3. Run and validate:

```bash
npm run build
node scripts/generate-social-pack.mjs
```

4. Use `NEXT-STEPS-CHECKLIST.md` as your execution order.

Note: once `SHOPIFY_CONFIG` is set, checkout redirects directly to Shopify for payment.
