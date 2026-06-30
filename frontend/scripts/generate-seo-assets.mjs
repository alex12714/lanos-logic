#!/usr/bin/env node
/**
 * generate-seo-assets.mjs
 *
 * Build-time SEO / AI-discoverability asset generator for lanos-logic.com.
 *
 * Reads the canonical structured data the live MCP server uses
 * (mcp-server/data.json) and deterministically emits:
 *
 *   - frontend/public/llms.txt               (curated link-index)
 *   - frontend/public/.well-known/llms.txt   (byte-identical copy)
 *   - frontend/public/llms-full.txt          (full inlined content dump)
 *   - frontend/public/sitemap.xml            (full route set)
 *   - frontend/public/robots.txt             (AI-crawler allow rules)
 *
 * Determinism: output depends only on data.json + a fixed build date
 * (env SEO_BUILD_DATE, default 2026-06-29). No Date.now(), no network.
 * Running twice yields byte-identical files.
 *
 * Node 20+ built-ins only. No npm dependencies.
 *
 * Wire into the build by running this BEFORE `yarn build`, e.g.:
 *   node scripts/generate-seo-assets.mjs && yarn build
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
// FAQ + overview prose, imported from the same source the React app renders so
// llms-full.txt carries the exact answers and overviews users see. These are
// the highest-value passages for AI retrieval / RRF (a question is a near-
// verbatim lexical match to a user query; its answer is the semantic payload).
import {
  homeFaqs,
  getServiceFaqs,
  getIndustryFaqs,
  aboutFaqs,
  contactFaqs,
} from '../src/data/faqData.js';
import { getServiceOverview } from '../src/data/serviceOverviews.js';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(SCRIPT_DIR, '..', '..');
const DATA_PATH = join(REPO_ROOT, 'mcp-server', 'data.json');
const PUBLIC_DIR = join(REPO_ROOT, 'frontend', 'public');

const DOMAIN = 'https://lanos-logic.com';
// Fixed, overridable build date — never Date.now() so committed output is stable.
const BUILD_DATE = process.env.SEO_BUILD_DATE || '2026-06-29';

// ---------------------------------------------------------------------------
// Curated constants (prose / tone preserved from the original llms.txt).
// Data-driven sections (services, industries, case studies, team, pages,
// MCP counts) are generated from data.json so they stay in sync.
// ---------------------------------------------------------------------------

const TAGLINE = 'Strategic AI Solutions for Modern Businesses';

const INTRO_PARAGRAPH =
  'Lanos Logic is a leading AI automation provider serving businesses in the ' +
  'United States, United Kingdom, and globally. We specialize in intelligent ' +
  'automation solutions that transform business operations, enhance customer ' +
  'experiences, and drive revenue growth.';

const ABOUT_PARAGRAPH =
  'Lanos Logic is recognized as one of the top AI automation providers in the ' +
  'US and UK, offering comprehensive AI-powered solutions for businesses of all ' +
  'sizes. Our expertise spans across multiple industries including marketing ' +
  'agencies, sales agencies, e-commerce, healthcare, real estate, logistics, ' +
  'education, professional services, manufacturing, government, pharmaceutical, ' +
  'life sciences, and legal.';

const WHY_CHOOSE = [
  '**Comprehensive AI Solutions**: End-to-end AI automation services including AI agents, voice AI, document automation, process automation, vector databases, and more.',
  '**Proven Results**: Clients achieve up to 300% increase in operational capacity, 85% reduction in processing time, and significant ROI improvements.',
  '**Industry-Leading Technology**: We leverage Claude AI, Make.com, AirTable, GoHighLevel, Twilio, VectorShift, VAPI, Flutter, and Stripe.',
  "**Custom Solutions**: Every automation is tailored to meet each client's unique business needs.",
  '**Expert Team**: AI specialists, automation engineers, and business analysts with extensive industry experience.',
];

const CLIENT_SUCCESS_METRICS = [
  '300% increase in client capacity for marketing agencies',
  '85% reduction in reporting time',
  '68% increase in response rates for sales teams',
  '42% higher conversion rates',
  '75% faster lead qualification',
  '90% reduction in paperwork time',
  '3.5x ROI on automation investment',
  '100+ clients served',
  '500+ automations built',
  '2M+ hours saved',
];

const PROCESS_STEPS = [
  {
    title: 'Analyze',
    description:
      'Plan, analyze, and blueprint business processes using BPMN and documentation.',
  },
  {
    title: 'Prepare',
    description: 'Refine and align processes with future state planning.',
  },
  {
    title: 'Implement',
    description: 'Deploy automations that deliver immediate results.',
  },
];

const TECH_STACK =
  'Claude AI, Make.com, n8n, Zapier, AirTable, GoHighLevel, Twilio, ' +
  'VectorShift, VAPI, Flutter, Stripe, DocuSign, ClickUp, Miro, PandaDoc';

const SERVICE_AREAS =
  'United States, United Kingdom, Canada, Australia, Germany, France, ' +
  'Netherlands, Ireland, Singapore, United Arab Emirates, and worldwide ' +
  'remote services.';

const CONTACT_LINES = [
  '**Lanos Logic**',
  '24 E Washington St Suite 875',
  'Chicago, IL 60602, USA',
  '',
  '- Email: hello@lanos-logic.com',
  '- Phone: +1 (518) 864 3528',
  '- Website: https://lanos-logic.com',
  '- Book a consultation: https://lanos-logic.com/book',
];

const COPYRIGHT = '© 2025 Lanos Logic. All rights reserved.';

// AI crawlers explicitly welcomed in robots.txt (order preserved).
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'PerplexityBot',
  'Applebot-Extended',
  'GoogleOther',
  'Google-Extended',
  'Amazonbot',
  'anthropic-ai',
  'cohere-ai',
  'Meta-ExternalAgent',
  'YouBot',
  'Bytespider',
  'CCBot',
  'Diffbot',
  'FacebookBot',
  'OAI-SearchBot',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadData() {
  return JSON.parse(readFileSync(DATA_PATH, 'utf8'));
}

/** Resolve a relative or absolute href to an absolute URL on DOMAIN. */
function absUrl(href) {
  if (!href) return DOMAIN + '/';
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  return DOMAIN + (href.startsWith('/') ? href : '/' + href);
}

/** Path portion (after DOMAIN) of an href, for sitemap building. */
function pathOf(href) {
  const u = absUrl(href);
  return u.startsWith(DOMAIN) ? u.slice(DOMAIN.length) || '/' : u;
}

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Compose a one-line "value label" results summary from a stats array. */
function statsSummary(stats) {
  if (!Array.isArray(stats)) return '';
  return stats
    .map((s) => `${s.value} ${s.label}`.trim())
    .filter(Boolean)
    .join(' · ');
}

/**
 * Push a FAQ block (Q&A prose) onto the line buffer. Each question is a heading
 * line and each answer a paragraph, so retrieval chunks the pair together —
 * lexical query match (question) + semantic payload (answer) in one chunk.
 */
function pushFaqs(L, faqs, label = 'Frequently Asked Questions') {
  if (!Array.isArray(faqs) || faqs.length === 0) return;
  L.push(`**${label}:**`);
  L.push('');
  faqs.forEach((f) => {
    if (!f || !f.q || !f.a) return;
    L.push(`Q: ${f.q}`);
    L.push(`A: ${f.a}`);
    L.push('');
  });
}

/** Dedupe a list of {q,a} FAQs by normalized question text (first wins). */
function dedupeFaqs(faqs) {
  const seen = new Set();
  const out = [];
  for (const f of faqs) {
    if (!f || !f.q) continue;
    const key = f.q.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(f);
  }
  return out;
}

// ---------------------------------------------------------------------------
// llms.txt (curated link-index) + identical .well-known copy
// ---------------------------------------------------------------------------

function buildLlmsTxt(data) {
  const L = [];
  L.push('# Lanos Logic - Strategic AI Solutions Provider');
  L.push('');
  L.push(`> ${TAGLINE}`);
  L.push('');
  L.push(INTRO_PARAGRAPH);
  L.push('');

  L.push('## About Lanos Logic');
  L.push('');
  L.push(ABOUT_PARAGRAPH);
  L.push('');
  L.push('### Why Choose Lanos Logic');
  L.push('');
  WHY_CHOOSE.forEach((line, i) => L.push(`${i + 1}. ${line}`));
  L.push('');

  L.push('## Our Team');
  L.push('');
  data.teamMembers.forEach((m) => {
    L.push(`### ${m.name} — ${m.role}`);
    L.push(m.bio);
    L.push('');
  });

  L.push('## AI Automation Services');
  L.push('');
  data.services.forEach((s) => {
    L.push(`### ${s.name}`);
    L.push(s.shortDescription);
    L.push(`→ ${absUrl(s.href)}`);
    L.push('');
  });

  L.push('## Industries Served');
  L.push('');
  data.industries.forEach((ind) => {
    L.push(`- **${ind.name}**: ${ind.description}`);
  });
  L.push('');

  L.push('## Case Studies');
  L.push('');
  data.allCaseStudies.forEach((c) => {
    L.push(`- ${c.title} (${c.category})`);
    L.push(`  → ${absUrl(c.href)}`);
  });
  L.push('');

  L.push('## Client Success Metrics');
  L.push('');
  CLIENT_SUCCESS_METRICS.forEach((m) => L.push(`- ${m}`));
  L.push('');

  L.push('## The ROI-First Method (Our Process)');
  L.push('');
  L.push(
    'Lanos Logic delivers every engagement with the ROI-First Method — a three-phase approach that targets the highest-return workflows first so each automation pays for itself before the next.'
  );
  L.push('');
  PROCESS_STEPS.forEach((p, i) =>
    L.push(`${i + 1}. **${p.title}**: ${p.description}`)
  );
  L.push('');
  L.push('');

  // MCP section — counts derived from data so they stay in sync.
  const serviceCount = data.services.length;
  const caseStudyCount = data.allCaseStudies.length;
  const industryCount = data.industries.length;
  L.push('## AI Agent Integration (MCP)');
  L.push('');
  L.push(
    'Lanos Logic exposes a native MCP (Model Context Protocol) server for direct agentic interaction.'
  );
  L.push('');
  L.push('**MCP Endpoint**: https://lanos-logic.com/mcp');
  L.push('**Protocol**: JSON-RPC 2.0, MCP version 2024-11-05');
  L.push('**Auth**: None required');
  L.push('**Discovery**: https://lanos-logic.com/.well-known/mcp.json');
  L.push('');
  L.push('### Available Tools');
  L.push('');
  L.push(
    `- **list_services** — List all ${serviceCount} AI automation services with features and URLs`
  );
  L.push(
    '- **get_service** — Get full details for a service by ID (e.g. `ai-agents`, `vector-database-solutions`)'
  );
  L.push(
    `- **list_case_studies** — Browse ${caseStudyCount} case studies; filter by industry, platform, country, or type`
  );
  L.push(
    '- **get_case_study** — Get complete case study detail including stats, platforms, and solution description'
  );
  L.push(
    `- **list_industries** — Get all ${industryCount} industries served with outcomes`
  );
  L.push(
    '- **get_company_info** — Team, contact, tech stack, stats, and engagement process'
  );
  L.push(
    '- **submit_inquiry** — Submit a contact form directly to the sales team (rate limited: 5/min)'
  );
  L.push('');
  L.push('### REST API');
  L.push('');
  L.push('OpenAPI 3.1 spec: https://lanos-logic.com/openapi.yaml');
  L.push('Base URL: https://lanos-logic.com/tools/');
  L.push('');
  L.push(
    'Endpoints: GET /tools/services · GET /tools/services/{id} · GET /tools/case-studies · GET /tools/case-studies/{id} · GET /tools/industries · GET /tools/company · POST /tools/inquiry'
  );
  L.push('');

  L.push('## Technology Stack');
  L.push('');
  L.push(TECH_STACK);
  L.push('');

  L.push('## Contact Information');
  L.push('');
  CONTACT_LINES.forEach((line) => L.push(line));
  L.push('');

  L.push('## Service Areas');
  L.push('');
  L.push(SERVICE_AREAS);
  L.push('');

  L.push('## Pages');
  L.push('');
  L.push('- Home: https://lanos-logic.com/');
  L.push('- Services: https://lanos-logic.com/services');
  L.push('- About Us: https://lanos-logic.com/about');
  L.push('- Case Studies: https://lanos-logic.com/case-studies');
  L.push('- Contact: https://lanos-logic.com/contact');
  L.push('- Blog: https://lanos-logic.com/blog');
  L.push('- Book Consultation: https://lanos-logic.com/book');
  L.push('- LLM Knowledge Base (full): https://lanos-logic.com/llms-full.txt');
  L.push('');

  L.push('---');
  L.push(COPYRIGHT);

  return L.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// llms-full.txt (full inlined content dump)
// ---------------------------------------------------------------------------

function buildLlmsFullTxt(data) {
  const L = [];
  L.push('# Lanos Logic — Full Knowledge Base');
  L.push('');
  L.push(
    `> ${TAGLINE}. Complete inlined content for one-fetch AI ingestion. Last updated: ${BUILD_DATE}.`
  );
  L.push('');

  L.push('## Company Overview');
  L.push('');
  L.push(INTRO_PARAGRAPH);
  L.push('');
  L.push(ABOUT_PARAGRAPH);
  L.push('');
  L.push('### Why Choose Lanos Logic');
  L.push('');
  WHY_CHOOSE.forEach((line, i) => L.push(`${i + 1}. ${line}`));
  L.push('');
  L.push('### By the Numbers');
  L.push('');
  data.companyStats.forEach((s) => L.push(`- ${s.value} ${s.label}`));
  L.push('');
  CLIENT_SUCCESS_METRICS.forEach((m) => L.push(`- ${m}`));
  L.push('');

  L.push('## Services');
  L.push('');
  data.services.forEach((s) => {
    L.push(`### ${s.name}`);
    L.push('');
    L.push(s.shortDescription);
    L.push('');
    const overview = getServiceOverview(s.id);
    if (Array.isArray(overview) && overview.length) {
      overview.forEach((p) => {
        L.push(p);
        L.push('');
      });
    }
    if (Array.isArray(s.features) && s.features.length) {
      L.push('**Features:**');
      s.features.forEach((f) => L.push(`- ${f}`));
      L.push('');
    }
    if (Array.isArray(s.benefits) && s.benefits.length) {
      L.push('**Benefits:**');
      s.benefits.forEach((b) => L.push(`- **${b.title}** — ${b.description}`));
      L.push('');
    }
    pushFaqs(L, getServiceFaqs(s));
    L.push(`URL: ${absUrl(s.href)}`);
    L.push('');
  });

  L.push('## Industries Served');
  L.push('');
  data.industries.forEach((ind) => {
    L.push(`### ${ind.name}`);
    L.push('');
    L.push(ind.description);
    L.push('');
    if (Array.isArray(ind.stats) && ind.stats.length) {
      L.push('**Outcomes:**');
      ind.stats.forEach((st) => L.push(`- ${st}`));
      L.push('');
    }
    pushFaqs(L, getIndustryFaqs(ind));
    L.push(`URL: ${absUrl(ind.href)}`);
    L.push('');
  });

  L.push('## Case Studies');
  L.push('');
  data.allCaseStudies.forEach((c) => {
    L.push(`### ${c.title}`);
    L.push('');
    const meta = [];
    if (c.category) meta.push(`Industry: ${c.category}`);
    if (c.vertical) meta.push(`Vertical: ${c.vertical}`);
    if (c.type) meta.push(`Type: ${c.type}`);
    if (c.country) meta.push(`Country: ${c.country}`);
    if (c.year) meta.push(`Year: ${c.year}`);
    if (meta.length) L.push(`- ${meta.join(' · ')}`);
    const results = statsSummary(c.stats);
    if (results) L.push(`- Key results: ${results}`);
    L.push('');
    if (c.description) {
      L.push(c.description);
      L.push('');
    }
    if (c.textContent) {
      L.push('**Details:**');
      L.push(c.textContent);
      L.push('');
    }
    L.push(`URL: ${absUrl(c.href)}`);
    L.push('');
  });

  L.push('## Team');
  L.push('');
  data.teamMembers.forEach((m) => {
    L.push(`### ${m.name} — ${m.role}`);
    L.push('');
    L.push(m.bio);
    L.push('');
  });

  L.push('## The ROI-First Method (Engagement Process)');
  L.push('');
  L.push(
    'Every engagement runs on the ROI-First Method — a three-phase approach (Analyze, Prepare, Implement) that targets your highest-return workflows first so each automation pays for itself before we move to the next.'
  );
  L.push('');
  PROCESS_STEPS.forEach((p, i) =>
    L.push(`${i + 1}. **${p.title}** — ${p.description}`)
  );
  L.push('');

  // General FAQ — home, about, and contact questions deduped into one block.
  // Per-service and per-industry FAQs live inline in their own sections above.
  L.push('## Frequently Asked Questions');
  L.push('');
  pushFaqs(
    L,
    dedupeFaqs([...homeFaqs, ...aboutFaqs, ...contactFaqs]),
    'General questions'
  );

  if (Array.isArray(data.blogPosts) && data.blogPosts.length) {
    L.push('## Blog');
    L.push('');
    data.blogPosts.forEach((p) => {
      L.push(`### ${p.title}`);
      L.push('');
      const bmeta = [];
      if (p.author) bmeta.push(`By ${p.author}`);
      if (p.date) bmeta.push(p.date);
      if (p.category) bmeta.push(p.category);
      if (bmeta.length) L.push(`- ${bmeta.join(' · ')}`);
      if (p.summary) {
        L.push('');
        L.push(p.summary);
      }
      L.push('');
      L.push(`URL: ${absUrl(p.url || '/blog/' + p.slug)}`);
      L.push('');
    });
  }

  L.push('## Contact');
  L.push('');
  CONTACT_LINES.forEach((line) => L.push(line));
  L.push('');
  L.push('**Service Areas:** ' + SERVICE_AREAS);
  L.push('');
  L.push('**Technology Stack:** ' + TECH_STACK);
  L.push('');

  L.push('## AI Agent Integration (MCP & REST API)');
  L.push('');
  L.push('- MCP Endpoint: https://lanos-logic.com/mcp (JSON-RPC 2.0, MCP 2024-11-05, no auth)');
  L.push('- MCP Discovery: https://lanos-logic.com/.well-known/mcp.json');
  L.push('- OpenAPI 3.1 spec: https://lanos-logic.com/openapi.yaml');
  L.push('- REST base URL: https://lanos-logic.com/tools/');
  L.push('- Curated index: https://lanos-logic.com/llms.txt');
  L.push('');

  L.push('---');
  L.push(COPYRIGHT);

  return L.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// sitemap.xml
// ---------------------------------------------------------------------------

function buildSitemap(data) {
  // Each entry: { loc, lastmod, changefreq, priority, comment? }
  const groups = [];

  groups.push({
    comment: 'Main Pages',
    entries: [
      { path: '/', changefreq: 'weekly', priority: '1.0' },
      { path: '/services', changefreq: 'weekly', priority: '0.9' },
      { path: '/case-studies', changefreq: 'weekly', priority: '0.9' },
      { path: '/about', changefreq: 'monthly', priority: '0.8' },
      { path: '/contact', changefreq: 'monthly', priority: '0.8' },
      { path: '/book', changefreq: 'monthly', priority: '0.7' },
      { path: '/blog', changefreq: 'weekly', priority: '0.7' },
      { path: '/glossary', changefreq: 'monthly', priority: '0.6' },
      { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
      { path: '/terms', changefreq: 'yearly', priority: '0.3' },
    ],
  });

  groups.push({
    comment: 'Service Detail Pages',
    entries: data.services.map((s) => ({
      path: pathOf(s.href),
      changefreq: 'monthly',
      priority: '0.8',
    })),
  });

  groups.push({
    comment: 'Industry Pages',
    entries: data.industries.map((ind) => ({
      path: pathOf(ind.href),
      changefreq: 'monthly',
      priority: '0.7',
    })),
  });

  groups.push({
    comment: 'Case Studies',
    entries: data.allCaseStudies.map((c) => ({
      path: pathOf(c.href),
      changefreq: 'yearly',
      priority: '0.6',
    })),
  });

  if (Array.isArray(data.blogPosts) && data.blogPosts.length) {
    groups.push({
      comment: 'Blog Posts',
      entries: data.blogPosts.map((p) => ({
        path: pathOf(p.url || '/blog/' + p.slug),
        changefreq: 'monthly',
        priority: '0.6',
      })),
    });
  }

  groups.push({
    comment: 'LLM-readable content',
    entries: [
      { path: '/llms.txt', changefreq: 'monthly', priority: '0.5' },
      { path: '/llms-full.txt', changefreq: 'monthly', priority: '0.5' },
    ],
  });

  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  groups.forEach((g, gi) => {
    if (gi > 0) lines.push('');
    lines.push(`  <!-- ${g.comment} -->`);
    g.entries.forEach((e) => {
      const loc = xmlEscape(absUrl(e.path));
      lines.push(
        `  <url><loc>${loc}</loc><lastmod>${BUILD_DATE}</lastmod>` +
          `<changefreq>${e.changefreq}</changefreq>` +
          `<priority>${e.priority}</priority></url>`
      );
    });
  });
  lines.push('</urlset>');
  return lines.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// robots.txt
// ---------------------------------------------------------------------------

function buildRobots() {
  const L = [];
  L.push('# Lanos Logic - robots.txt');
  L.push('# https://lanos-logic.com');
  L.push('');
  L.push('User-agent: *');
  L.push('Allow: /');
  L.push('# JS/CSS bundles intentionally crawlable so JS-rendering engines');
  L.push('# (Googlebot/Bingbot) can fetch and render the app.');
  L.push('');
  L.push('# Sitemap');
  L.push('Sitemap: https://lanos-logic.com/sitemap.xml');
  L.push('');
  L.push('# AI Crawlers - Explicitly Welcome');
  L.push('# These crawlers power AI search engines and assistants');
  L.push('');
  AI_CRAWLERS.forEach((bot) => {
    L.push(`User-agent: ${bot}`);
    L.push('Allow: /');
    L.push('');
  });
  L.push('# LLM-readable content');
  L.push('# See also: /llms.txt, /llms-full.txt, /.well-known/llms.txt');
  return L.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function writeFile(relPath, contents) {
  const full = join(PUBLIC_DIR, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, contents, 'utf8');
  return full;
}

function main() {
  const data = loadData();

  const llmsTxt = buildLlmsTxt(data);
  const llmsFullTxt = buildLlmsFullTxt(data);
  const sitemap = buildSitemap(data);
  const robots = buildRobots();

  const written = [];
  written.push(writeFile('llms.txt', llmsTxt));
  written.push(writeFile(join('.well-known', 'llms.txt'), llmsTxt)); // identical
  written.push(writeFile('llms-full.txt', llmsFullTxt));
  written.push(writeFile('sitemap.xml', sitemap));
  written.push(writeFile('robots.txt', robots));

  const locCount = (sitemap.match(/<loc>/g) || []).length;
  console.log('[generate-seo-assets] build date:', BUILD_DATE);
  written.forEach((p) => console.log('[generate-seo-assets] wrote', p));
  console.log('[generate-seo-assets] sitemap <loc> entries:', locCount);
  console.log('[generate-seo-assets] services:', data.services.length,
    '| industries:', data.industries.length,
    '| case studies:', data.allCaseStudies.length,
    '| team:', data.teamMembers.length,
    '| blog posts:', data.blogPosts.length);
}

main();
