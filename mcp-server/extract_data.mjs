import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Resolve paths relative to this script so it runs both locally and on the
// deploy host (previously hardcoded to /data/websites/... — host-only).
const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, '..', 'frontend', 'src', 'data');
const OUT_FILE = join(__dirname, 'data.json');

function makeCJS(path) {
  const src = readFileSync(path, 'utf-8')
    .replace(/^export const /gm, 'exports.')
    .replace(/^import .+\n/gm, '')
    // Replace JSX icon component references
    .replace(/\b(Bot|Phone|FileText|Workflow|Share2|MessageSquare|Smartphone|BarChart3|Database|ScanLine|ShieldAlert|ShieldCheck|Check|Zap|Heart|DollarSign|TrendingUp|Lightbulb|LineChart|ArrowRight|Users|Calendar|Settings|TestTube)\b,/g, '"icon",')
    .replace(/icon:\s*(Bot|Phone|FileText|Workflow|Share2|MessageSquare|Smartphone|BarChart3|Database|ScanLine|ShieldAlert|ShieldCheck)/g, (_, name) => 'icon: "' + name + '"');
  return src;
}

writeFileSync('/tmp/mock_cjs.cjs', makeCJS(join(SRC_DIR, 'mock.js')));
writeFileSync('/tmp/cs_cjs.cjs', makeCJS(join(SRC_DIR, 'caseStudiesData.js')));

const require = createRequire(import.meta.url);
const mock = require('/tmp/mock_cjs.cjs');
const cs = require('/tmp/cs_cjs.cjs');

const allCS = (cs.allCaseStudies || []).map(c => ({
  id: c.id,
  title: c.title,
  category: c.category,
  vertical: c.vertical || null,
  type: c.type || null,
  description: c.description,
  stats: c.stats || [],
  tags: c.tags || [],
  platforms: c.platforms || [],
  country: c.country || null,
  year: c.year || null,
  daysToComplete: c.daysToComplete || null,
  monthlyHoursSaved: c.monthlyHoursSaved || null,
  href: 'https://lanos-logic.com' + (c.href || ''),
  textContent: (c.fullContent || [])
    .filter(b => b.type === 'text' && b.content && b.content.length > 40)
    .map(b => b.content)
    .slice(0, 5)
    .join(' ')
}));

const output = {
  services: mock.services || [],
  industries: mock.industries || [],
  teamMembers: mock.teamMembers || [],
  companyStats: mock.companyStats || [],
  blogPosts: (mock.blogPosts || []).map(({ content, ...rest }) => ({
    ...rest,
    url: 'https://lanos-logic.com/blog/' + rest.slug
  })),
  caseStudiesSummary: (mock.caseStudies || []).map(c => ({
    ...c,
    href: 'https://lanos-logic.com' + c.href
  })),
  allCaseStudies: allCS
};

writeFileSync(OUT_FILE, JSON.stringify(output, null, 2));
console.log('Services:', output.services.length);
console.log('Industries:', output.industries.length);
console.log('Team:', output.teamMembers.length);
console.log('Summary case studies:', output.caseStudiesSummary.length);
console.log('All case studies:', output.allCaseStudies.length);
console.log('Blog posts:', output.blogPosts.length);
