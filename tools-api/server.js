// Lanos Logic — Free Tools API
// Endpoint: POST /api/tools/ai-crawler-check  { "url": "https://example.com" }
// Fetches the target's robots.txt + homepage + llms.txt and reports how visible
// the site is to AI answer engines (GPTBot, ClaudeBot, PerplexityBot, …), with a
// readiness score and concrete fixes. Node 20+ built-ins only (global fetch).
//
// Security: this fetches a user-supplied URL, so it is SSRF-hardened — only
// http/https, public IPs only (private/loopback/link-local/metadata blocked via
// DNS pre-resolution), redirects not followed, hard timeouts and size caps.

import http from 'node:http';
import dns from 'node:dns/promises';
import net from 'node:net';

const PORT = process.env.PORT || 8090;
const FETCH_TIMEOUT_MS = 7000;
const MAX_BYTES = 512 * 1024; // 512 KB cap per resource

// AI crawlers that feed answer engines. label = what it powers.
const AI_CRAWLERS = [
  { ua: 'GPTBot', label: 'ChatGPT (training/answers)' },
  { ua: 'OAI-SearchBot', label: 'ChatGPT Search' },
  { ua: 'ChatGPT-User', label: 'ChatGPT (user browsing)' },
  { ua: 'ClaudeBot', label: 'Claude' },
  { ua: 'Claude-Web', label: 'Claude (web)' },
  { ua: 'anthropic-ai', label: 'Anthropic' },
  { ua: 'PerplexityBot', label: 'Perplexity' },
  { ua: 'Google-Extended', label: 'Google Gemini / AI Overviews' },
  { ua: 'Applebot-Extended', label: 'Apple Intelligence' },
  { ua: 'Amazonbot', label: 'Amazon / Alexa' },
  { ua: 'CCBot', label: 'Common Crawl (feeds many LLMs)' },
  { ua: 'Bytespider', label: 'TikTok / Doubao' },
];

// ---------- SSRF guards ----------
function isBlockedIp(ip) {
  if (net.isIPv4(ip)) {
    const p = ip.split('.').map(Number);
    if (p[0] === 10) return true;
    if (p[0] === 127) return true;
    if (p[0] === 0) return true;
    if (p[0] === 169 && p[1] === 254) return true; // link-local + cloud metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
    if (p[0] === 192 && p[1] === 168) return true;
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    if (p[0] >= 224) return true; // multicast/reserved
    return false;
  }
  if (net.isIPv6(ip)) {
    const x = ip.toLowerCase();
    if (x === '::1' || x === '::') return true;
    if (x.startsWith('fe80') || x.startsWith('fc') || x.startsWith('fd')) return true;
    if (x.startsWith('::ffff:')) return isBlockedIp(x.split(':').pop());
    return false;
  }
  return true;
}

// A container can't hairpin back to its own host's public IP, so checking
// lanos-logic.com (which resolves there) times out. Instead we fetch our own
// site straight from the nginx container by name on the shared coolify network.
// SELF_HOSTS maps the public hostname -> internal base; SELF_INTERNAL_NAMES are
// the internal container names allowed past the private-IP SSRF guard. Both are
// fixed and non-user-controlled, so they only ever reach our own site.
const SELF_HOSTS = {
  'lanos-logic.com': 'http://lanos-logic-com',
  'www.lanos-logic.com': 'http://lanos-logic-com',
};
const SELF_INTERNAL_NAMES = new Set(['lanos-logic-com']);

async function assertPublicHost(hostname) {
  if (!hostname || hostname === 'localhost') throw new Error('blocked host');
  if (SELF_INTERNAL_NAMES.has(hostname.toLowerCase())) return;
  if (net.isIP(hostname) && isBlockedIp(hostname)) throw new Error('blocked ip');
  const records = await dns.lookup(hostname, { all: true });
  if (!records.length) throw new Error('no dns');
  for (const r of records) if (isBlockedIp(r.address)) throw new Error('private ip');
}

// Follow up to `maxRedirects` hops (apex→www, http→https are ubiquitous), but
// SSRF-validate the host of every hop so a redirect can't point us at an
// internal address.
async function safeFetch(targetUrl, maxRedirects = 4) {
  let current = targetUrl;
  for (let hop = 0; hop <= maxRedirects; hop++) {
    const u = new URL(current);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new Error('bad protocol');
    await assertPublicHost(u.hostname);
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(u.href, {
        redirect: 'manual',
        signal: ctrl.signal,
        headers: { 'User-Agent': 'LanosLogic-AICrawlerChecker/1.0 (+https://lanos-logic.com/tools)' },
      });
      if ([301, 302, 303, 307, 308].includes(res.status)) {
        const loc = res.headers.get('location');
        if (!loc) return { status: res.status, body: '', headers: res.headers, finalUrl: u.href };
        current = new URL(loc, u.href).href; // resolve relative redirects
        continue;
      }
      const reader = res.body?.getReader();
      let received = 0;
      const chunks = [];
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value.length;
          if (received > MAX_BYTES) { try { await reader.cancel(); } catch {} break; }
          chunks.push(value);
        }
      }
      const body = Buffer.concat(chunks).toString('utf8');
      return { status: res.status, body, headers: res.headers, finalUrl: u.href };
    } finally {
      clearTimeout(t);
    }
  }
  throw new Error('too many redirects');
}

// ---------- robots.txt parsing ----------
// Returns true if `path` ('/') is allowed for the given crawler UA.
function isAllowed(robotsTxt, ua) {
  if (!robotsTxt) return true; // no robots.txt => everything allowed
  const lines = robotsTxt.split(/\r?\n/).map((l) => l.replace(/#.*$/, '').trim());
  // Build groups: array of { agents:[], rules:[{allow:bool, path}] }
  const groups = [];
  let cur = null;
  let lastWasAgent = false;
  for (const line of lines) {
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const field = m[1].toLowerCase();
    const val = m[2].trim();
    if (field === 'user-agent') {
      if (!lastWasAgent || !cur) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else if ((field === 'allow' || field === 'disallow') && cur) {
      cur.rules.push({ allow: field === 'allow', path: val });
      lastWasAgent = false;
    } else {
      lastWasAgent = false;
    }
  }
  const uaLc = ua.toLowerCase();
  // Most specific matching group: exact UA match preferred over '*'
  let group = groups.find((g) => g.agents.includes(uaLc)) ||
              groups.find((g) => g.agents.includes('*'));
  if (!group) return true;
  // Longest-match rule for '/'. Empty Disallow means allow all.
  let decision = true; // default allow
  let bestLen = -1;
  for (const r of group.rules) {
    if (r.path === '' ) { if (!r.allow) continue; } // "Disallow:" empty = allow all
    const path = r.path || '/';
    if ('/'.startsWith(path) || path === '/') {
      if (path.length > bestLen) { bestLen = path.length; decision = r.allow; }
    }
  }
  // Explicit "Disallow: /" blocks
  const hasFullDisallow = group.rules.some((r) => !r.allow && r.path === '/');
  const hasFullAllow = group.rules.some((r) => r.allow && r.path === '/');
  if (hasFullDisallow && !hasFullAllow) return false;
  return decision;
}

async function aiCrawlerCheck(rawUrl) {
  let u;
  try {
    u = new URL(rawUrl.includes('://') ? rawUrl : `https://${rawUrl}`);
  } catch {
    return { error: 'Please enter a valid website URL.' };
  }
  const origin = `${u.protocol}//${u.host}`;
  // For our own domain, fetch from the nginx container internally (no hairpin).
  // `origin` is still what we display to the user.
  const fetchBase = SELF_HOSTS[u.hostname.toLowerCase()] || origin;

  let robots = { status: 0, body: '' };
  try { robots = await safeFetch(`${fetchBase}/robots.txt`); }
  catch (e) {
    const reason = /abort|timeout/i.test(e.message)
      ? 'it took too long to respond'
      : /enotfound|dns/i.test(e.message)
        ? 'we couldn’t find that domain'
        : 'it isn’t publicly reachable';
    return { error: `We couldn’t reach ${origin} — ${reason}. Check the URL and make sure the site is public.` };
  }

  const robotsTxt = robots.status === 200 ? robots.body : '';
  const robotsPresent = robots.status === 200 && robotsTxt.trim().length > 0;

  const crawlers = AI_CRAWLERS.map((c) => ({
    ua: c.ua,
    label: c.label,
    allowed: isAllowed(robotsTxt, c.ua),
  }));

  // llms.txt
  let llmsTxt = false;
  try { const r = await safeFetch(`${fetchBase}/llms.txt`); llmsTxt = r.status === 200 && r.body.trim().length > 0; } catch {}

  // homepage: schema + meta noai + sitemap
  let schema = false, metaNoAi = false, sitemap = false;
  try {
    const home = await safeFetch(fetchBase + '/');
    const html = home.body || '';
    schema = /application\/ld\+json/i.test(html);
    metaNoAi = /<meta[^>]+(noai|noimageai)/i.test(html);
  } catch {}
  if (robotsTxt) sitemap = /sitemap\s*:/i.test(robotsTxt);

  const allowedCount = crawlers.filter((c) => c.allowed && !metaNoAi).length;
  const total = crawlers.length;

  // Score: access is the bulk; llms.txt + schema are bonuses; noai is a big penalty.
  let score = Math.round((allowedCount / total) * 70);
  if (llmsTxt) score += 15;
  if (schema) score += 10;
  if (sitemap) score += 5;
  if (metaNoAi) score = Math.min(score, 25);
  score = Math.max(0, Math.min(100, score));

  const recommendations = [];
  const blocked = crawlers.filter((c) => !c.allowed);
  if (metaNoAi) recommendations.push('Remove the "noai"/"noimageai" meta tag — it tells AI engines not to use your content.');
  if (blocked.length) recommendations.push(`Allow these AI crawlers in robots.txt: ${blocked.map((c) => c.ua).join(', ')}.`);
  if (!llmsTxt) recommendations.push('Add an llms.txt (and llms-full.txt) knowledge base so AI engines can read a clean summary of your business.');
  if (!schema) recommendations.push('Add JSON-LD structured data (Organization, FAQ, Service) so models can parse your entities.');
  if (!sitemap) recommendations.push('Reference a sitemap.xml in robots.txt to help engines discover every page.');
  if (!recommendations.length) recommendations.push('Strong AI visibility foundation. Next: retrieval-ready content + citations + monitoring (the rest of the GEO stack).');

  return {
    url: origin,
    score,
    grade: score >= 80 ? 'Strong' : score >= 50 ? 'Moderate' : 'Weak',
    robotsPresent,
    checks: { llmsTxt, schema, sitemap, metaNoAi },
    crawlers,
    allowedCount,
    totalCrawlers: total,
    recommendations,
  };
}

// ---------- HTTP server + tiny rate limit ----------
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const win = 60_000, max = 20;
  const rec = hits.get(ip) || { n: 0, t: now };
  if (now - rec.t > win) { rec.n = 0; rec.t = now; }
  rec.n += 1; hits.set(ip, rec);
  return rec.n > max;
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET' && (req.url === '/api/tools/health' || req.url === '/health')) {
    res.end(JSON.stringify({ ok: true })); return;
  }
  if (req.method !== 'POST' || !req.url.endsWith('/ai-crawler-check')) {
    res.statusCode = 404; res.end(JSON.stringify({ error: 'not found' })); return;
  }
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'x';
  if (rateLimited(ip)) { res.statusCode = 429; res.end(JSON.stringify({ error: 'Too many checks — try again in a minute.' })); return; }

  let body = '';
  req.on('data', (c) => { body += c; if (body.length > 4096) req.destroy(); });
  req.on('end', async () => {
    try {
      const { url } = JSON.parse(body || '{}');
      if (!url || typeof url !== 'string') { res.statusCode = 400; res.end(JSON.stringify({ error: 'Provide a "url".' })); return; }
      const result = await aiCrawlerCheck(url.trim());
      res.statusCode = result.error ? 400 : 200;
      res.end(JSON.stringify(result));
    } catch (e) {
      res.statusCode = 500; res.end(JSON.stringify({ error: 'Something went wrong running the check.' }));
    }
  });
});

server.listen(PORT, () => console.log(`[tools-api] listening on ${PORT}`));
