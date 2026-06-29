#!/usr/bin/env node
/**
 * IndexNow ping — notifies IndexNow-participating search engines (Bing, Yandex,
 * Seznam, Naver, etc.) that URLs have changed so they re-crawl promptly.
 *
 * Standalone Node (>=18, uses global fetch + DOMless XML parsing). No deps.
 * NOT wired into deploy automation — run it manually after a deploy:
 *
 *   node frontend/scripts/indexnow-ping.mjs
 *
 * It reads the public sitemap, extracts <loc> URLs, and submits them in one
 * batch POST to the IndexNow API, authenticated by the static key file served
 * at https://lanos-logic.com/<KEY>.txt.
 *
 * Flags / env:
 *   --dry-run            print the payload, do not POST
 *   SITEMAP_URL=<url>    override sitemap (default https://lanos-logic.com/sitemap.xml)
 *   INDEXNOW_HOST=<host> override host (default lanos-logic.com)
 */

const HOST = process.env.INDEXNOW_HOST || 'lanos-logic.com';
const KEY = '13da2a6232872600a75c8cbb17fe8fbb';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const DRY_RUN = process.argv.includes('--dry-run');

async function fetchSitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl, { headers: { 'User-Agent': 'indexnow-ping/1.0' } });
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap ${sitemapUrl}: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  // Minimal, dependency-free <loc> extraction. Sitemap is generator-controlled
  // (well-formed), so a regex over <loc>…</loc> is sufficient and safe here.
  const urls = [];
  const re = /<loc>\s*([^<\s][^<]*?)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const u = m[1].trim();
    if (u.startsWith('http')) urls.push(u);
  }
  return [...new Set(urls)];
}

async function main() {
  const urlList = await fetchSitemapUrls(SITEMAP_URL);
  if (urlList.length === 0) {
    console.error(`No URLs found in ${SITEMAP_URL} — nothing to submit.`);
    process.exit(1);
  }

  const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

  console.log(`IndexNow: ${urlList.length} URL(s) from ${SITEMAP_URL}`);
  console.log(`  host=${HOST} keyLocation=${KEY_LOCATION} endpoint=${ENDPOINT}`);

  if (DRY_RUN) {
    console.log('--dry-run: payload below, not submitting.\n');
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, validation pending).
  const body = await res.text().catch(() => '');
  if (res.ok || res.status === 202) {
    console.log(`IndexNow accepted: HTTP ${res.status}${body ? ` — ${body}` : ''}`);
  } else {
    console.error(`IndexNow rejected: HTTP ${res.status}${body ? ` — ${body}` : ''}`);
    // 400 invalid format, 403 key not found/mismatch, 422 url/key mismatch, 429 rate limit.
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
