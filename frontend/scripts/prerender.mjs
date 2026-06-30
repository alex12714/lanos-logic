// Static prerender crawler (postbuild step).
//
// CRA emits a single index.html shell with an empty <div id="root">. This
// script serves the build over a tiny static server (SPA fallback to the
// original shell so React always boots fresh), visits every route in headless
// Chromium, lets React render + hoist its per-route <head> metadata and JSON-LD,
// then writes the fully-rendered DOM to build/<route>/index.html.
//
// Routes come from the canonical sitemap (the 73 URLs) plus any same-origin
// links discovered while crawling (e.g. /blog and blog posts, which are not in
// the sitemap). react-snap was evaluated first but its bundled Chromium
// (Puppeteer 1.x, ~Chrome 71) cannot execute the React 19 bundle, so we use a
// modern Puppeteer/Chromium instead.

import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
// Bind to an OS-assigned ephemeral port (set once the server is listening) so a
// leftover/concurrent prerender process can never cause EADDRINUSE — which would
// abort the prerender and ship an un-prerendered SPA shell to production.
let ORIGIN;
const NAV_TIMEOUT = 30000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json; charset=utf-8',
};

if (!fs.existsSync(path.join(BUILD_DIR, 'index.html'))) {
  console.error('[prerender] build/index.html not found — run the build first.');
  process.exit(1);
}

// Read the shell ONCE before we start writing prerendered files so the SPA
// fallback always returns a clean shell (empty #root) during the crawl.
const SHELL_HTML = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');

const hasExtension = (pathname) => path.extname(pathname) !== '';

function startServer() {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (hasExtension(urlPath)) {
      const filePath = path.join(BUILD_DIR, urlPath);
      if (filePath.startsWith(BUILD_DIR) && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    // SPA fallback — always the clean shell so React renders the requested route.
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(SHELL_HTML);
  });
  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => {
      ORIGIN = `http://127.0.0.1:${server.address().port}`;
      resolve(server);
    })
  );
}

function routesFromSitemap() {
  const sitemapPath = path.join(BUILD_DIR, 'sitemap.xml');
  const routes = new Set(['/']);
  if (!fs.existsSync(sitemapPath)) return routes;
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  for (const m of matches) {
    const loc = m.replace(/<\/?loc>/g, '').trim();
    let pathname;
    try {
      pathname = new URL(loc).pathname;
    } catch {
      continue;
    }
    if (hasExtension(pathname)) continue; // skip /llms.txt and other files
    routes.add(pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/');
  }
  return routes;
}

function outFileForRoute(route) {
  if (route === '/') return path.join(BUILD_DIR, 'index.html');
  return path.join(BUILD_DIR, route.replace(/^\//, ''), 'index.html');
}

async function main() {
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const queue = [...routesFromSitemap()];
  const visited = new Set();
  let written = 0;
  let failed = 0;

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      // Allow only same-origin (our static server). Block posthog, msgsndr,
      // youtube, etc. so the crawl is fast and never hangs on third parties.
      if (url.startsWith(ORIGIN) || url.startsWith('data:')) request.continue();
      else request.abort();
    });

    while (queue.length) {
      const route = queue.shift();
      if (visited.has(route)) continue;
      visited.add(route);

      try {
        await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });
        // Wait until React has mounted and set a route-specific <title>.
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root');
            return (
              root && root.children.length > 0 &&
              document.querySelector('footer') &&
              document.title && document.title.length > 0
            );
          },
          { timeout: NAV_TIMEOUT }
        );

        // Discover same-origin links to also prerender (e.g. /blog, blog posts).
        const links = await page.$$eval('a[href]', (els) =>
          els.map((el) => el.getAttribute('href')).filter(Boolean)
        );
        for (const href of links) {
          if (!href.startsWith('/') || href.startsWith('//')) continue;
          const clean = href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
          if (clean.includes('.')) continue;
          if (!visited.has(clean) && !queue.includes(clean)) queue.push(clean);
        }

        const html = await page.evaluate(() => document.documentElement.outerHTML);
        const outFile = outFileForRoute(route);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, `<!doctype html>\n${html}`);
        written += 1;
        process.stdout.write(`  ✓ ${route}\n`);
      } catch (err) {
        failed += 1;
        process.stdout.write(`  ✗ ${route} — ${err.message}\n`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`[prerender] wrote ${written} routes, ${failed} failed, ${visited.size} visited.`);
  if (failed > 0 || written === 0) process.exit(1);
}

main().catch((err) => {
  console.error('[prerender] fatal:', err);
  process.exit(1);
});
