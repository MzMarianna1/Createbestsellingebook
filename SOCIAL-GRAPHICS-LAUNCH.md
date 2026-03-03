# Social Graphics Launch (Google + Canva + Shopify)

This is the fastest way to **start pushing social graphics today** with your current stack.

## 1) Generate your Week 1 pack

```bash
node scripts/generate-social-pack.mjs
```

Outputs:
- `output/social-graphics-week1.csv`
- `output/social-prompts-week1.md`

## 2) Create graphics in Canva (batch)

1. Open Canva and choose post templates by platform.
2. Use `output/social-prompts-week1.md` for art direction prompts.
3. Keep brand style locked:
   - Hyper-real character emotion
   - Pixar-like cinematic lighting
   - Cyberpunk accents in moderation
   - Clean CTA whitespace
4. Export final assets to Google Drive folder `03-Social-Creatives`.

## 3) Queue publishing in Google Sheet

Create a `publish_queue` tab in your automation sheet with columns:
- day
- platform
- asset_drive_url
- caption
- cta_url
- publish_datetime
- status

Paste rows from `output/social-graphics-week1.csv` and fill `asset_drive_url` + `publish_datetime`.

## 4) Publish workflow (simple)

- Status flow: `draft -> scheduled -> published`
- Each morning, publish any row where `publish_datetime <= now` and `status = scheduled`
- Mark row `published` and log post URL

## 5) CTA routing map

Use this standard map for simplicity:
- Awareness posts -> `/quiz`
- Proof/education posts -> `/sales`
- High-intent posts -> `/checkout`

## 6) KPI check (daily, 10 min)

Track in Google Sheets:
- clicks by route (`/quiz`, `/sales`, `/checkout`)
- checkout starts
- purchases
- conversion rate

If sales slow down:
1. Improve hook clarity in first 2 seconds
2. Increase emotional realism in visuals
3. Reduce copy complexity and tighten CTA


## 7) Use built-in high-converting caption styles

The generator now includes two pre-formatted caption styles requested for higher engagement:
- **Problem/Solution (Best for Reels)**
- **Short & Punchy (Best for Stories/Quick Posts)**

Both are included in `data/social-graphics-week1.json` (Days 8–9) and exported to:
- `output/social-graphics-week1.csv` (`captionStyle`, `caption` columns)
- `output/social-prompts-week1.md` (ready-to-copy caption blocks)
