// Per-route Open Graph card generator (postbuild step, runs AFTER prerender).
//
// The prerender step writes build/<route>/index.html for every route. This
// script walks those files, reads each page <title>, derives a short type
// label from the route path, renders a branded 1200x630 card with headless
// Chromium, and writes build/og/<slug>.png. The Seo component points each
// route's og:image / twitter:image at https://lanos-logic.com/og/<slug>.png.
//
// Cards are rendered via page.setContent (no HTTP server), so this step cannot
// collide with prerender's port even when several builds run concurrently.
//
// This step is non-fatal: any failure (Chromium launch, a single bad route)
// degrades gracefully — routes without a generated card simply fall back to the
// global /og-image.png referenced by the Seo component's fallback path. The
// postbuild script also guards the whole step with `|| echo`.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const OG_DIR = path.join(BUILD_DIR, 'og');

// Optional cap for fast local smoke tests: OG_LIMIT=3 node scripts/generate-og-images.mjs
const LIMIT = Number.parseInt(process.env.OG_LIMIT || '', 10);

// Slugify a route pathname into the card filename stem. MUST stay in lock-step
// with src/lib/seo.js (slugifyRoute).
function slugForRoute(route) {
  const clean = String(route).split('?')[0].split('#')[0].replace(/\/+$/, '');
  if (!clean || clean === '/') return 'home';
  const slug = clean
    .replace(/^\/+/, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return slug || 'home';
}

// Short type label derived from the route shape.
function typeLabelForRoute(route) {
  if (route.startsWith('/services/')) return 'Service';
  if (route.startsWith('/industries/')) return 'Industry';
  if (route.startsWith('/case-studies/')) return 'Case Study';
  if (route.startsWith('/blog/')) return 'Article';
  return 'Page';
}

// Recursively collect every build/<route>/index.html and map it to a route.
function collectRoutes(dir, base = '') {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === 'og' && base === '') continue; // never recurse our own output
      out.push(...collectRoutes(path.join(dir, entry.name), `${base}/${entry.name}`));
    } else if (entry.name === 'index.html') {
      out.push({ route: base === '' ? '/' : base, file: path.join(dir, 'index.html') });
    }
  }
  return out;
}

// Pull the document <title>, then strip the trailing site-name suffix so the
// headline is the page's own title. Falls back to the full title.
function headlineFromHtml(html, route) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return slugForRoute(route).replace(/-/g, ' ');
  const raw = match[1]
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
  // Drop a trailing " | Lanos Logic ..." or " — Lanos Logic ..." segment.
  let headline = raw.split('|')[0].trim();
  headline = headline.replace(/\s*[—-]\s*Lanos Logic.*$/i, '').trim();
  return headline || raw;
}

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Parametrized 1200x630 card. Dark #0a0a12 base, orange #FF6B1F accent, the
// page title as the headline, a "Lanos Logic" wordmark and the type label.
function cardHtml({ headline, typeLabel }) {
  const h = escapeHtml(headline);
  const label = escapeHtml(typeLabel);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{
  background:radial-gradient(1100px 700px at 80% -10%, rgba(255,107,31,0.16), transparent 60%),
             radial-gradient(900px 600px at -10% 110%, rgba(124,58,237,0.16), transparent 55%),
             #0a0a12;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  position:relative;overflow:hidden;color:#fff;
}
.frame{position:absolute;inset:0;border:1px solid rgba(255,255,255,0.06)}
.bar{position:absolute;top:0;left:0;height:8px;width:100%;
  background:linear-gradient(90deg,#FF6B1F 0%,#FFCE54 100%)}
.wrap{position:absolute;inset:0;padding:80px 88px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:20px}
.mark{width:64px;height:64px;border-radius:16px;
  background:linear-gradient(135deg,#FF6B1F 0%,#FFCE54 100%);
  display:flex;align-items:center;justify-content:center;
  font-size:38px;font-weight:800;color:#0a0a12}
.brand{font-size:30px;font-weight:700;letter-spacing:-0.5px;color:#fff}
.label{margin-left:auto;font-size:20px;font-weight:600;letter-spacing:2px;
  text-transform:uppercase;color:#FFCE54;
  border:1px solid rgba(255,107,31,0.5);background:rgba(255,107,31,0.12);
  padding:10px 22px;border-radius:999px}
.headline{font-size:72px;line-height:1.08;font-weight:800;letter-spacing:-1.5px;
  max-width:1024px;
  display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.accent{color:#FF6B1F}
.bottom{display:flex;align-items:center;justify-content:space-between}
.url{font-size:24px;color:#9ca3af;font-weight:500}
.tag{font-size:22px;color:#6b7280}
</style></head><body>
<div class="frame"></div>
<div class="bar"></div>
<div class="wrap">
  <div class="top">
    <div class="mark">L</div>
    <div class="brand">Lanos Logic</div>
    <div class="label">${label}</div>
  </div>
  <h1 class="headline">${h}</h1>
  <div class="bottom">
    <div class="url">lanos-logic.com</div>
    <div class="tag">Strategic AI Automation</div>
  </div>
</div>
</body></html>`;
}

async function main() {
  if (!fs.existsSync(path.join(BUILD_DIR, 'index.html'))) {
    console.error('[og] build/index.html not found — run the build (and prerender) first.');
    process.exit(1);
  }

  let routes = collectRoutes(BUILD_DIR);
  // Deterministic order; home first.
  routes.sort((a, b) => (a.route === '/' ? -1 : b.route === '/' ? 1 : a.route.localeCompare(b.route)));
  if (Number.isInteger(LIMIT) && LIMIT > 0) routes = routes.slice(0, LIMIT);

  if (routes.length === 0) {
    console.error('[og] no prerendered routes found — nothing to generate.');
    process.exit(1);
  }

  fs.mkdirSync(OG_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  let written = 0;
  let failed = 0;
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

    for (const { route, file } of routes) {
      try {
        const html = fs.readFileSync(file, 'utf8');
        const headline = headlineFromHtml(html, route);
        const typeLabel = typeLabelForRoute(route);
        const slug = slugForRoute(route);

        await page.setContent(cardHtml({ headline, typeLabel }), { waitUntil: 'load' });
        const outFile = path.join(OG_DIR, `${slug}.png`);
        await page.screenshot({ path: outFile, type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
        written += 1;
        process.stdout.write(`  ✓ ${route} → og/${slug}.png\n`);
      } catch (err) {
        failed += 1;
        process.stdout.write(`  ✗ ${route} — ${err.message}\n`);
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`[og] wrote ${written} cards, ${failed} failed.`);
  // Non-fatal even on partial failure: routes without a card fall back to the
  // global /og-image.png via the Seo component. Only hard-fail if nothing wrote.
  if (written === 0) process.exit(1);
}

main().catch((err) => {
  console.error('[og] fatal:', err);
  process.exit(1);
});
