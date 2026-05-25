import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';

function makeCJS(path) {
  const src = readFileSync(path, 'utf-8')
    .replace(/^export const /gm, 'exports.')
    .replace(/^import .+\n/gm, '')
    // Replace JSX icon component references
    .replace(/\b(Bot|Phone|FileText|Workflow|Share2|MessageSquare|Smartphone|BarChart3|Database|ScanLine|ShieldAlert|ShieldCheck|Check|Zap|Heart|DollarSign|TrendingUp|Lightbulb|LineChart|ArrowRight|Users|Calendar|Settings|TestTube)\b,/g, '"icon",')
    .replace(/icon:\s*(Bot|Phone|FileText|Workflow|Share2|MessageSquare|Smartphone|BarChart3|Database|ScanLine|ShieldAlert|ShieldCheck)/g, (_, name) => 'icon: "' + name + '"');
  return src;
}

writeFileSync('/tmp/mock_cjs.cjs', makeCJS('/data/websites/lanos-logic.com/repo/frontend/src/data/mock.js'));
writeFileSync('/tmp/cs_cjs.cjs', makeCJS('/data/websites/lanos-logic.com/repo/frontend/src/data/caseStudiesData.js'));

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

writeFileSync('/data/websites/lanos-logic.com/mcp-server/data.json', JSON.stringify(output, null, 2));
console.log('Services:', output.services.length);
console.log('Industries:', output.industries.length);
console.log('Team:', output.teamMembers.length);
console.log('Summary case studies:', output.caseStudiesSummary.length);
console.log('All case studies:', output.allCaseStudies.length);
console.log('Blog posts:', output.blogPosts.length);
