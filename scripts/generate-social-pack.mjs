import fs from 'node:fs';
import path from 'node:path';

const inputPath = path.resolve('data/social-graphics-week1.json');
const outDir = path.resolve('output');
const csvPath = path.join(outDir, 'social-graphics-week1.csv');
const promptsPath = path.join(outDir, 'social-prompts-week1.md');

const rows = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });

const csvHeader = [
  'day',
  'platform',
  'format',
  'hook',
  'objective',
  'cta',
  'route',
  'captionStyle',
  'visualDirection',
  'caption',
  'captionTemplate',
].join(',');

const escapeCsv = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

const csvLines = rows.map((row) => {
  const captionTemplate = `${row.hook}. ${row.objective}. CTA: ${row.cta} (${row.route}).`;
  return [
    row.day,
    row.platform,
    row.format,
    row.hook,
    row.objective,
    row.cta,
    row.route,
    row.captionStyle || 'Standard',
    row.visualDirection,
    row.caption || '',
    captionTemplate,
  ].map(escapeCsv).join(',');
});

fs.writeFileSync(csvPath, [csvHeader, ...csvLines].join('\n'));

const promptLines = rows.map((row) => {
  const finalCaption = row.caption || `${row.hook}. ${row.objective}. CTA: ${row.cta} (${row.route}).`;
  return `## Day ${row.day} — ${row.hook}\n- Platform: ${row.platform}\n- Format: ${row.format}\n- Objective: ${row.objective}\n- Style Template: ${row.captionStyle || 'Standard'}\n- Visual: ${row.visualDirection}\n- CTA Route: ${row.route}\n- Caption:\n\n\`\`\`\n${finalCaption}\n\`\`\`\n\n- Prompt:\n\n\`\`\`\nCreate a ${row.format} social graphic for ${row.platform}. Theme: ${row.hook}. Style: hyper-realistic, Pixar-style cinematic lighting, emotionally warm, child-friendly cyberpunk accent palette (cyan/magenta/violet accents only), premium typography, no AI artifacts, clean whitespace for CTA. Include clear copy hierarchy and CTA '${row.cta}'.\n\`\`\`\n`;
}).join('\n');

fs.writeFileSync(promptsPath, `# Social Graphic Prompts (Week 1+)\n\n${promptLines}`);

console.log(`Generated:\n- ${path.relative(process.cwd(), csvPath)}\n- ${path.relative(process.cwd(), promptsPath)}\n- Total posts: ${rows.length}`);
