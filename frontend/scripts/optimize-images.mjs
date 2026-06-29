#!/usr/bin/env node
/**
 * optimize-images.mjs
 *
 * Converts the in-app-referenced large raster images (PNG/JPG) under
 * `public/` to WebP (quality ~80, original dimensions preserved), writing the
 * `.webp` alongside the original. Originals are KEPT so nothing 404s if a path
 * is referenced elsewhere; the in-app `<img>`/data references are pointed at
 * the `.webp` versions separately.
 *
 * This is build-tooling only. `sharp` is a devDependency and this script is run
 * locally by a developer; the resulting `.webp` files are committed, so the
 * production/deploy host never needs image tooling installed.
 *
 * Usage:  node scripts/optimize-images.mjs
 *
 * Excludes (left untouched, by design): favicon.ico, icon.svg, og-image.png,
 * og-image.svg, any placeholder.*, and any .svg — these are intentionally not
 * converted (social scrapers need PNG/SVG, icons stay vector).
 */
import sharp from 'sharp';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const QUALITY = 80;

// In-app-referenced raster images that exist on disk. Paths are relative to
// public/ (i.e. the same path used as the `/...` src in the app).
const TARGETS = [
  // Platform logos (data/mock.js -> PartnersSection)
  'make-logo.png',
  'airtable-logo.jpg',
  'docusign-logo-new.png',
  'miro-logo.jpg',
  'gohighlevel-logo-new.jpg',
  'clickup-logo.png',
  'claude-logo.png',
  'vectorshift-logo-new.png',
  'flutter-logo.jpg',
  'twilio-logo.png',
  'stripe-logo.png',
  'vapi-logo.png',
  // Case-study cards (data/mock.js -> CaseStudiesPage)
  'case-study-marketing.png',
  'case-study-sales.png',
  'case-study-real-estate.png',
  'case-study-saas.png',
  'case-study-legal.png',
  'case-study-ecommerce.png',
  'case-study-education.png',
  'case-study-healthcare.png',
  'case-study-logistics.png',
  'case-study-manufacturing.png',
  // AI showcase (components/home/AIToolsSection.jsx)
  'claude-ai-showcase.png',
  // Team photos (data/mock.js -> AboutPage)
  'team/daniel-roberts.jpg',
  'team/alex-podbrezsky.jpg',
  'team/adrian-ionescu.jpg',
  'team/leo-katz.jpg',
  'team/alex-tanaka.jpg',
  'team/anna-kowalska.jpg',
  'team/sophia-mitchell.jpg',
  'team/marcus-halvorsen.jpg',
  'team/daria-melnyk.jpg',
  'team/erik-dahlgren.jpg',
];

const fmt = (n) => `${(n / 1024).toFixed(1)} KB`;

async function run() {
  const manifest = [];
  let totalOld = 0;
  let totalNew = 0;

  for (const rel of TARGETS) {
    const src = path.join(PUBLIC_DIR, rel);
    if (!existsSync(src)) {
      console.warn(`! skip (missing): ${rel}`);
      continue;
    }
    const outRel = rel.replace(/\.(png|jpe?g)$/i, '.webp');
    const out = path.join(PUBLIC_DIR, outRel);

    const input = await readFile(src);
    const webp = await sharp(input).webp({ quality: QUALITY }).toBuffer();

    const oldSize = (await stat(src)).size;
    const newSize = webp.length;

    // Only emit (and recommend reference swap) when WebP is actually smaller.
    const smaller = newSize < oldSize;
    if (smaller) {
      await writeFile(out, webp);
    }

    totalOld += oldSize;
    if (smaller) totalNew += newSize;
    else totalNew += oldSize; // no swap -> original still served

    manifest.push({
      src: '/' + rel,
      webp: '/' + outRel,
      oldSize,
      newSize,
      written: smaller,
    });

    const tag = smaller ? 'ok ' : 'KEPT (webp not smaller)';
    console.log(
      `${tag} ${rel.padEnd(34)} ${fmt(oldSize).padStart(10)} -> ${fmt(newSize).padStart(10)}`
    );
  }

  await writeFile(
    path.join(__dirname, 'optimize-images.manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n'
  );

  const saved = totalOld - totalNew;
  console.log('\n--- summary ---');
  console.log(`images processed : ${manifest.length}`);
  console.log(`written (.webp)  : ${manifest.filter((m) => m.written).length}`);
  console.log(`original total   : ${fmt(totalOld)}`);
  console.log(`optimized total  : ${fmt(totalNew)}`);
  console.log(`bytes saved      : ${fmt(saved)} (${((saved / totalOld) * 100).toFixed(1)}%)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
