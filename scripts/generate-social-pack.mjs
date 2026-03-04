#!/usr/bin/env node
/**
 * generate-social-pack.mjs
 *
 * Generates a 7-day Canva-ready social media content pack for
 * Mz. Marianna's "Stop Homework Battles" campaign.
 *
 * Usage:
 *   node scripts/generate-social-pack.mjs
 *   node scripts/generate-social-pack.mjs --days 14
 *   node scripts/generate-social-pack.mjs --out ./my-social-pack.json
 *
 * Output:
 *   social-pack-YYYY-MM-DD.json  (default, in project root)
 *
 * Each day includes:
 *   - A carousel post (Instagram / Facebook, 1080×1080)
 *   - A Reel / short-form video script (30-60 s)
 *   - A Story graphic (1080×1920)
 *   - Hashtag set (primary + secondary + community)
 *   - Best posting time per platform
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Parse CLI flags ─────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const daysFlag = args.indexOf('--days');
const DAYS = daysFlag !== -1 ? parseInt(args[daysFlag + 1], 10) || 7 : 7;
const outFlag = args.indexOf('--out');
const dateStr = new Date().toISOString().slice(0, 10);
const OUTPUT_FILE =
  outFlag !== -1 ? resolve(args[outFlag + 1]) : resolve(ROOT, `social-pack-${dateStr}.json`);

// ─── Load brand guidelines ───────────────────────────────────────────────────
const guidelines = JSON.parse(
  readFileSync(resolve(ROOT, 'src/brand-guidelines.json'), 'utf8'),
);

const { messaging, calls_to_action, hashtag_strategy, content_formats, best_practices } = guidelines;

// ─── Content themes (one per day, cycles if DAYS > 7) ───────────────────────
const WEEKLY_THEMES = [
  {
    day: 1,
    theme: 'The Homework Battle is Real',
    pain_point: messaging.storytelling_framework.pain_points[0],
    hook: messaging.emotional_hooks.pain_point_based[0],
    villain: messaging.storytelling_framework.villain.secondary[0],
    cta: calls_to_action.primary[0],
    canva_template: 'CAROUSEL_BOLD_TEAL',
    format: 'carousel',
  },
  {
    day: 2,
    theme: "Your Kid Isn't Broken — The System Is",
    pain_point: messaging.storytelling_framework.pain_points[5],
    hook: messaging.emotional_hooks.villain_based[2],
    villain: messaging.storytelling_framework.villain.secondary[1],
    cta: calls_to_action.primary[1],
    canva_template: 'OVERLAY_SOCIAL_PROOF',
    format: 'feed_post',
  },
  {
    day: 3,
    theme: '3 Signs Homework Is Traumatizing Your Child',
    pain_point: messaging.storytelling_framework.pain_points[2],
    hook: messaging.emotional_hooks.pain_point_based[3],
    villain: messaging.storytelling_framework.villain.secondary[3],
    cta: calls_to_action.engagement[0],
    canva_template: 'CAROUSEL_BOLD_TEAL',
    format: 'carousel',
  },
  {
    day: 4,
    theme: 'The 4 Scaffolds Framework',
    pain_point: messaging.storytelling_framework.pain_points[10],
    hook: messaging.emotional_hooks.identity_based[0],
    villain: messaging.storytelling_framework.villain.primary,
    cta: calls_to_action.educational[1],
    canva_template: 'REEL_HOOK_OVERLAY',
    format: 'reel',
  },
  {
    day: 5,
    theme: 'Before & After: What Changes When You Scaffold Right',
    pain_point: messaging.storytelling_framework.pain_points[1],
    hook: messaging.emotional_hooks.transformation_based[3],
    villain: messaging.storytelling_framework.villain.secondary[4],
    cta: calls_to_action.primary[2],
    canva_template: 'BEFORE_AFTER_SPLIT',
    format: 'carousel',
  },
  {
    day: 6,
    theme: "Parent Win: 'He Finished Homework Alone for the First Time'",
    pain_point: messaging.storytelling_framework.personal_anecdotes?.[2] || messaging.storytelling_framework.pain_points[6],
    hook: messaging.emotional_hooks.relatability_based[3],
    villain: messaging.storytelling_framework.villain.secondary[2],
    cta: calls_to_action.engagement[3],
    canva_template: 'OVERLAY_SOCIAL_PROOF',
    format: 'feed_post',
  },
  {
    day: 7,
    theme: 'Take the Free Quiz: Which Scaffold Does Your Child Need?',
    pain_point: messaging.storytelling_framework.pain_points[11],
    hook: messaging.emotional_hooks.fomo_based[0],
    villain: messaging.storytelling_framework.villain.secondary[5],
    cta: calls_to_action.primary[0],
    canva_template: 'QUIZ_CTA_CARD',
    format: 'story',
  },
];

// ─── Hashtag builder ─────────────────────────────────────────────────────────
function buildHashtags() {
  const primary = hashtag_strategy.primary.slice(0, 5);
  const secondary = hashtag_strategy.secondary.slice(0, 5);
  const community = hashtag_strategy.community.slice(0, 3);
  return [...primary, ...secondary, ...community].join(' ');
}

// ─── Canva prompt builder ────────────────────────────────────────────────────
function buildCanvaPrompt(theme, format, template) {
  const { colors, typography } = guidelines.visual;
  const baseStyle = `Brand colors: background ${colors.background}, primary text ${colors.primary_text}, accent ${colors.accent}. Font: bold sans-serif. Zero clutter. High contrast.`;

  const formatSpecs = {
    carousel: `Canvas size: 1080×1080 px. 5-slide carousel. Slide 1: Bold hook headline. Slides 2-4: One key insight each. Slide 5: CTA with quiz URL.`,
    feed_post: `Canvas size: 1080×1080 px. Single image. Bold manifesto headline centred. Subheading below. CTA at bottom.`,
    reel: `Canvas size: 1080×1920 px. Text overlay on clean background. Hook text top-third. Script bullet points middle. CTA last 3 seconds.`,
    story: `Canvas size: 1080×1920 px. Vertical story card. Headline top. Body middle. Quiz button / swipe-up CTA bottom.`,
  };

  return `${baseStyle} ${formatSpecs[format] || formatSpecs.feed_post} Theme: "${theme}". Template style: ${template}.`;
}

// ─── Caption builder ─────────────────────────────────────────────────────────
function buildCaption(dayTheme) {
  const { part_1_challenge, part_2_solution, part_3_results } =
    messaging.post_structure.three_part_framework;
  const closing = messaging.post_structure.closing_impact_statements.action_based[0];

  return (
    `🔥 ${dayTheme.hook}\n\n` +
    `${part_1_challenge.example}\n\n` +
    `${part_2_solution.example}\n\n` +
    `${part_3_results.example}\n\n` +
    `${closing}\n\n` +
    `${buildHashtags()}`
  );
}

// ─── Reel script builder ─────────────────────────────────────────────────────
function buildReelScript(dayTheme) {
  const hook_formulas = content_formats.reels.hook_formulas;
  const hook = hook_formulas[dayTheme.day % hook_formulas.length].replace(
    /\[.*?\]/g,
    () => dayTheme.theme,
  );
  return {
    hook_line: hook,
    body_bullets: [
      `Pain: ${dayTheme.pain_point}`,
      `Villain: ${dayTheme.villain}`,
      `Solution tease: The Scaffold Method changes this.`,
    ],
    cta: dayTheme.cta,
    duration_seconds: 45,
    audio_note: 'Use trending audio. Keep on-brand. Subtitle every word.',
  };
}

// ─── Generate pack ───────────────────────────────────────────────────────────
const pack = { generated_at: new Date().toISOString(), days: [] };

for (let i = 0; i < DAYS; i++) {
  const template = WEEKLY_THEMES[i % WEEKLY_THEMES.length];
  const dayNumber = i + 1;
  const theme = { ...template, day: dayNumber };

  const platforms = ['instagram', 'facebook'];
  if (theme.format === 'reel') platforms.push('tiktok');

  pack.days.push({
    day: dayNumber,
    theme: theme.theme,
    format: theme.format,
    platforms,
    posting_times: {
      instagram: best_practices.posting_times.instagram[0],
      facebook: best_practices.posting_times.facebook[0],
    },
    canva: {
      template: theme.canva_template,
      prompt: buildCanvaPrompt(theme.theme, theme.format, theme.canva_template),
      size: theme.format === 'story' || theme.format === 'reel' ? '1080×1920' : '1080×1080',
    },
    caption: buildCaption(theme),
    reel_script: theme.format === 'reel' ? buildReelScript(theme) : null,
    hashtags: buildHashtags(),
    cta: theme.cta,
  });
}

// ─── Write output ─────────────────────────────────────────────────────────────
writeFileSync(OUTPUT_FILE, JSON.stringify(pack, null, 2));

console.log(`✅  Social pack generated — ${DAYS} days of content`);
console.log(`📄  Output: ${OUTPUT_FILE}`);
console.log('');
console.log('Next steps:');
console.log('  1. Open the output file and copy each "canva.prompt" into Canva AI or your designer.');
console.log('  2. Export the finished graphics to your 02-Canva-Exports Google Drive folder.');
console.log('  3. Copy each "caption" into your ContentScheduler in the Marketing Dashboard.');
console.log('  4. Schedule posts at the times listed in "posting_times" for maximum reach.');
