import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import { Button } from '../components/ui/button';
import { glossaryTerms } from '../data/glossaryData';
import { breadcrumb, definedTermSet, speakableWebPage } from '../lib/seo';

const GlossaryPage = () => {
  const jsonLd = [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Glossary', path: '/glossary' },
    ]),
    definedTermSet({
      name: 'AI Automation & Security Glossary',
      description:
        'Clear, answer-first definitions of the core AI automation and cybersecurity terms used by Lanos Logic — from AI agents and RAG to BPMN and penetration testing.',
      url: '/glossary',
      items: glossaryTerms,
    }),
    speakableWebPage({
      name: 'AI Automation Glossary — Key Terms Explained | Lanos Logic',
      description:
        'A plain-English glossary of AI automation and cybersecurity terms: AI agents, voice AI, vector databases, RAG, MCP, BPMN, document automation, penetration testing and more.',
      url: '/glossary',
    }),
  ];

  return (
    <Layout>
      <Seo
        title="AI Automation Glossary — Key Terms Explained | Lanos Logic"
        description="A plain-English glossary of AI automation and cybersecurity terms: AI agents, voice AI, vector databases, RAG, MCP, BPMN, document automation, penetration testing and more."
        path="/glossary"
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mx-auto mb-8">
            <BookOpen className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            AI Automation <span className="text-amber-400">Glossary</span>
          </h1>
          <p className="page-intro text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Clear, plain-English definitions of the core terms behind AI agents,
            automation, and security. Each entry is a self-contained answer you
            can use to understand exactly what Lanos Logic builds.
          </p>
        </div>
      </section>

      {/* Terms Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {glossaryTerms.map((item) => {
              const anchor = item.term
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              return (
                <div
                  key={item.term}
                  id={anchor}
                  className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6 sm:p-8 scroll-mt-28 hover:border-amber-500/30 transition-all duration-300"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-3">
                    {item.term}
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-base">
                    {item.definition}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to put these into practice?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Explore our services or book a free discovery call to see which of
            these solutions fits your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-8 h-14 gap-2 shadow-lg shadow-amber-500/25"
              asChild
            >
              <Link to="/book">
                Book a Discovery Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 rounded-full px-8 h-14"
              asChild
            >
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GlossaryPage;
