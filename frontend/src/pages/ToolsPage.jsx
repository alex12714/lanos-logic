import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import { breadcrumb, speakableWebPage } from '../lib/seo';

const TOOLS = [
  {
    name: 'AI Crawler Access Checker',
    href: '/tools/ai-crawler-checker',
    icon: Bot,
    desc: 'See whether ChatGPT, Claude, Perplexity, and Google’s AI crawlers can read your site — with an instant AI-readiness score and the fixes to become citable.',
    tag: 'Free · Instant',
    live: true,
  },
];

const ToolsPage = () => {
  const jsonLd = [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Free Tools', path: '/tools' },
    ]),
    speakableWebPage({
      name: 'Free GEO & AI-Search Tools | Lanos Logic',
      description: 'Free tools from Lanos Logic to check and improve how AI search engines see your website.',
      url: '/tools',
    }),
  ];

  return (
    <Layout>
      <Seo
        title="Free GEO & AI-Search Tools | Lanos Logic"
        description="Free tools to check and improve how AI search engines (ChatGPT, Claude, Perplexity, Gemini) see your website — starting with the AI Crawler Access Checker."
        path="/tools"
        jsonLd={jsonLd}
      />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-semibold">Free Tools</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Free <span className="text-amber-400">GEO & AI-search</span> tools
            </h1>
            <p className="page-intro text-gray-400 text-lg max-w-2xl mx-auto">
              Practical tools to check and improve how AI engines see your business —
              built by the team that does this for a living.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  to={tool.href}
                  className="group bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-amber-400" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">{tool.tag}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">{tool.name}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{tool.desc}</p>
                  <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium">
                    Try it free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
            <div className="bg-gradient-to-br from-[#1a1a2e]/40 to-[#16162a]/40 border border-dashed border-white/10 rounded-3xl p-8 flex items-center justify-center text-center">
              <p className="text-gray-500 text-sm">More free GEO & automation tools coming soon.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ToolsPage;
