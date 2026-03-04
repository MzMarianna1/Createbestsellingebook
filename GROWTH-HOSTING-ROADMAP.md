# Growth + Hosting Roadmap

## Objective
Create a simplified, automated system that can scale toward **$1M in ebook sales through Shopify** while keeping creative quality high and emotionally engaging for children and parents.

---

## A. Simplified architecture (minimum moving parts)

1. **Frontend (this repo):**
   - Host on Vercel or Netlify
   - Landing page + offer + story + CTA sections
2. **Checkout + products:**
   - Shopify (single source of truth for product, payments, taxes)
3. **Automation + data layer:**
   - Google Apps Script + Sheets for scheduled automation and analytics events
4. **Creative production:**
   - Canva workflow for export-ready assets and social variants

This keeps your stack to: **Vite + Shopify + Google Apps Script/Sheets/Drive + Canva**.

---

## B. Hosting plan (production-ready)

### Step 1 — Deploy frontend
- Deploy this repository to Vercel (or Netlify).
- Use custom domain (example: `readwithmarianna.com`).
- Enable HTTPS and performance analytics.

### Step 2 — Environment setup
- Store keys in hosting environment variables, never in source code.
- Keep separate values for staging vs production.

### Step 3 — Reliability
- Add uptime monitor for homepage and checkout redirect.
- Add a simple error page with recovery CTA.

---

## C. Shopify sales engine for $1M target

### Funnel structure (simple)
1. **Traffic source** (short video, influencer clip, organic social)
2. **Sales page** (this app): problem → transformation → proof → CTA
3. **Shopify checkout** with 1-click order bump
4. **Post-purchase upsell** (bonus printables / companion workbook)
5. **Email/SMS follow-up** for abandoned cart + review request

### Revenue math example
- Target: $1,000,000/year
- If AOV = $42, required orders ≈ **23,810/year** (≈65/day)
- With 2.5% conversion rate, sessions needed ≈ **2,600/day**

Use this math to guide ad budget and content cadence.

---

## D. Automation blueprint

## Daily automations
- Generate social posts from ebook chapters
- Auto-publish content calendar drafts
- Sync campaign links with UTM tags

## Weekly automations
- Pull conversion report (sessions, ATC, checkout, purchase)
- Flag underperforming creatives
- Generate new hook/thumbnail copy variants

## Monthly automations
- Top 10 hooks report
- Cohort revenue report
- Upsell attachment rate report

---

## E. Design direction (non-AI-looking, emotionally strong)

Use these style constraints across sales pages, covers, ads, and social:

1. **Visual style:**
   - Hyper-realistic + Pixar-inspired lighting and expressions
   - Human warmth, visible emotion, cinematic depth
2. **Color language:**
   - Cyberpunk accent palette in moderation (neon cyan, magenta, violet)
   - Keep readable contrast and calm neutral backgrounds
3. **Typography:**
   - Friendly, modern sans fonts with strong hierarchy
   - Avoid over-stylized novelty fonts for body text
4. **Composition:**
   - One emotional focal subject per creative
   - Clear CTA zone with clean whitespace
5. **Quality gate:**
   - Reject images with obvious AI artifacts (hands, eyes, texture repetition)

---

## F. Conversion optimization priorities (in order)

1. Improve headline + hero CTA clarity
2. Add stronger social proof and parent testimonials
3. Add product bundles to increase AOV
4. Add urgency campaigns (limited bonus windows)
5. Improve checkout trust blocks and guarantee language

Keep tests small: one major variable at a time.

---

## G. 30-day execution sprint

### Week 1
- Deploy frontend and connect custom domain
- Connect primary Shopify product + buy button
- Configure core analytics events

### Week 2
- Publish 3 creative angles and 2 landing page variants
- Start abandoned-cart flow and welcome sequence

### Week 3
- Launch retargeting campaign + post-purchase upsell
- Review funnel leaks and patch biggest drop-off

### Week 4
- Double down on top-converting creative
- Document SOPs for repeatable scaling

---

## H. Key metrics dashboard

Track these every week:
- Sessions
- Conversion rate
- AOV
- CAC
- MER/ROAS
- Refund rate
- Upsell take rate
- Email revenue share

If conversion drops, inspect landing page clarity and checkout friction first.
