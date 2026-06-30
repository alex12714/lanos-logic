import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Search, Loader2, AlertCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import FaqSection from '../components/common/FaqSection';
import { Button } from '../components/ui/button';
import { breadcrumb, speakableWebPage } from '../lib/seo';

const FAQS = [
  {
    q: 'What is an AI crawler and why does access matter?',
    a: 'AI crawlers like GPTBot, ClaudeBot, and PerplexityBot are the bots that read the web to power AI assistants and AI search. If your robots.txt blocks them, those engines can’t read your site — so they can’t cite or recommend your business in their answers.',
  },
  {
    q: 'Which AI crawlers does this tool check?',
    a: 'GPTBot, OAI-SearchBot and ChatGPT-User (ChatGPT), ClaudeBot, Claude-Web and anthropic-ai (Claude), PerplexityBot (Perplexity), Google-Extended (Gemini and Google AI Overviews), Applebot-Extended, Amazonbot, CCBot (Common Crawl), and Bytespider.',
  },
  {
    q: 'Does a high score mean I’ll get cited by ChatGPT?',
    a: 'Access is necessary but not sufficient. Letting AI crawlers in is step one; getting cited also depends on machine-readable structure (schema, llms.txt), retrieval-ready content, and authority. This tool scores the foundation — the full picture is our 5-Layer GEO Stack.',
  },
  {
    q: 'Is my data stored?',
    a: 'No. The check fetches your site’s public robots.txt and homepage in real time and returns the result. We don’t store the URL or the report.',
  },
];

const CheckRow = ({ ok, label, good, bad }) => (
  <div className="flex items-center gap-3 py-2">
    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${ok ? 'bg-green-500/15' : 'bg-red-500/15'}`}>
      {ok ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
    </div>
    <span className="text-gray-300 text-sm">{ok ? good : bad}</span>
  </div>
);

const AiCrawlerCheckerPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const runCheck = async (e) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) { setError('Enter a website URL to check.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await fetch('/api/tools/ai-crawler-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setError(data.error || 'Could not run the check. Try again.'); }
      else { setResult(data); }
    } catch {
      setError('Network error — please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  const jsonLd = [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Free Tools', path: '/tools' },
      { name: 'AI Crawler Access Checker', path: '/tools/ai-crawler-checker' },
    ]),
    speakableWebPage({
      name: 'AI Crawler Access Checker | Lanos Logic',
      description: 'Free tool: check whether ChatGPT, Claude, Perplexity, and Google AI crawlers can access your website, and get an AI-readiness score.',
      url: '/tools/ai-crawler-checker',
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'AI Crawler Access Checker',
      applicationCategory: 'SEO / GEO tool',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      url: 'https://lanos-logic.com/tools/ai-crawler-checker',
    },
  ];

  const scoreColor = (s) => (s >= 80 ? 'from-green-400 to-emerald-500' : s >= 50 ? 'from-amber-400 to-amber-500' : 'from-red-400 to-rose-500');

  return (
    <Layout>
      <Seo
        title="Free AI Crawler Access Checker — Can ChatGPT & Perplexity See Your Site? | Lanos Logic"
        description="Free tool: check whether AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) can access your website. Get an instant AI-readiness score and the fixes to become citable in AI answers."
        path="/tools/ai-crawler-checker"
        jsonLd={jsonLd}
      />

      {/* Hero + tool */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/tools" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm">
            ← Free Tools
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Can AI <span className="text-amber-400">see your site?</span>
          </h1>
          <p className="page-intro text-gray-400 text-lg mb-8">
            Find out in seconds whether ChatGPT, Claude, Perplexity, and Google’s AI
            crawlers can actually read your website — the first requirement for being
            cited in AI answers.
          </p>

          <form onSubmit={runCheck} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourcompany.com"
              className="flex-1 bg-[#16162a] border border-white/10 rounded-full px-6 h-14 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50"
              aria-label="Website URL"
            />
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-8 h-14 gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? 'Checking…' : 'Check my site'}
            </Button>
          </form>

          {error && (
            <div className="mt-5 inline-flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="relative pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Score */}
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8 mb-8 text-center">
              <p className="text-gray-400 text-sm mb-2">AI-readiness score for {result.url}</p>
              <div className={`text-6xl font-bold bg-gradient-to-r ${scoreColor(result.score)} bg-clip-text text-transparent`}>
                {result.score}<span className="text-2xl text-gray-500">/100</span>
              </div>
              <p className="text-lg font-semibold text-white mt-2">{result.grade} AI visibility foundation</p>
              <p className="text-gray-400 text-sm mt-1">
                {result.allowedCount} of {result.totalCrawlers} AI crawlers can access your site
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Crawlers */}
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">AI crawler access</h3>
                <div className="space-y-1">
                  {result.crawlers.map((c) => (
                    <div key={c.ua} className="flex items-center justify-between py-1.5">
                      <div>
                        <span className="text-gray-200 text-sm font-medium">{c.ua}</span>
                        <span className="text-gray-500 text-xs block">{c.label}</span>
                      </div>
                      {c.allowed ? (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs font-medium"><Check className="w-3.5 h-3.5" /> Allowed</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-400 text-xs font-medium"><X className="w-3.5 h-3.5" /> Blocked</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Signals + recommendations */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-bold mb-3">Machine-readability signals</h3>
                  <CheckRow ok={result.checks.llmsTxt} good="llms.txt knowledge base found" bad="No llms.txt found" />
                  <CheckRow ok={result.checks.schema} good="JSON-LD structured data found" bad="No JSON-LD schema found" />
                  <CheckRow ok={result.checks.sitemap} good="Sitemap referenced in robots.txt" bad="No sitemap in robots.txt" />
                  <CheckRow ok={!result.checks.metaNoAi} good="No anti-AI meta tag" bad="“noai” meta tag is blocking AI" />
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-2xl p-6">
                  <h3 className="text-amber-400 font-bold mb-3">Recommended fixes</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((r, i) => (
                      <li key={i} className="text-gray-300 text-sm leading-relaxed flex gap-2">
                        <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-3">Want the full picture?</h3>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                This checks the foundation. Our free GEO Visibility Audit shows exactly
                where AI engines do — and don’t — cite your business, and how to fix it.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-8 h-14 gap-2"
                asChild
              >
                <Link to="/services/agentic-seo-geo">
                  Get Your Free GEO Visibility Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <FaqSection faqs={FAQS} subheading="Common questions about AI crawler access and getting cited by AI." />
    </Layout>
  );
};

export default AiCrawlerCheckerPage;
