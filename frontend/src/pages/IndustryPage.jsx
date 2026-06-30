import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import FaqSection from '../components/common/FaqSection';
import { Button } from '../components/ui/button';
import { industries, services } from '../data/mock';
import { SITE, ORG, breadcrumb, speakableWebPage } from '../lib/seo';
import { getIndustryFaqs } from '../data/faqData';

// Real outcomes pulled directly from Lanos Logic case studies, keyed by
// industry id. Used to open the highest-proof verticals with a concrete result
// instead of a generic description. Every figure traces to a real project in
// caseStudiesData.js — no invented numbers.
const INDUSTRY_PROOF = {
  marketing: {
    metric: '95% less time on content',
    detail:
      'A marketing team scaled thought-leadership with an AI content agent — 95% less time creating content and 60% higher engagement.',
  },
  sales: {
    metric: '$147K in 84 days',
    detail:
      'A sales agency added $147K in revenue in 84 days and reclaimed 43 hours a month with data-driven automation.',
  },
  healthcare: {
    metric: '9,600 certificates automated a year',
    detail:
      'A medical equipment testing company automated 9,600 certificates a year, saved 192 hours a month, and redeployed 4 full-time staff.',
  },
  legal: {
    metric: '10,000+ contracts automated',
    detail:
      'A law firm automated 10,000+ contracts and reclaimed 90 hours every month with an end-to-end document and e-signature flow.',
  },
  'real-estate': {
    metric: '32% of team time reclaimed',
    detail:
      'A real estate design company moved off spreadsheets and reclaimed 32% of its team’s time.',
  },
  education: {
    metric: '80% of admin time saved',
    detail:
      'University of Minnesota cut 80% of student-onboarding admin time with an automated intake flow.',
  },
};

const IndustryPage = () => {
  const { industryId } = useParams();
  const industry = industries.find(i => i.id === industryId || i.href.includes(industryId));

  if (!industry) {
    return (
      <Layout>
        <Seo
          title="Industry Not Found | Lanos Logic"
          description="The industry page you are looking for could not be found."
          path={`/industries/${industryId || ''}`}
          noindex
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Industry Not Found</h1>
            <Link to="/" className="text-amber-400 hover:text-amber-300">
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const faqs = getIndustryFaqs(industry);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `AI Automation for ${industry.name}`,
      serviceType: 'AI Automation',
      provider: ORG,
      description: industry.description,
      areaServed: ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'NL', 'IE', 'SG', 'AE'],
      audience: { '@type': 'BusinessAudience', name: industry.name },
      url: `${SITE}${industry.href}`,
    },
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: industry.name, path: industry.href },
    ]),
    speakableWebPage({
      name: `AI Automation for ${industry.name} | Lanos Logic`,
      description: industry.description,
      url: industry.href,
    }),
  ];

  return (
    <Layout>
      <Seo
        title={`AI Automation for ${industry.name} | Lanos Logic`}
        description={industry.description}
        path={industry.href}
        jsonLd={jsonLd}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              AI Automation for <span className="text-amber-400">{industry.name}</span>
            </h1>
            <p className="page-intro text-gray-400 text-lg mb-8 leading-relaxed">
              {industry.description}
            </p>
            {INDUSTRY_PROOF[industry.id] && (
              <div className="mb-8 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/30 rounded-2xl p-5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                    {INDUSTRY_PROOF[industry.id].metric}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">
                    Real result
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mt-2">
                  {INDUSTRY_PROOF[industry.id].detail}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-8 h-14 gap-2"
                asChild
              >
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 rounded-full px-8 h-14"
                asChild
              >
                <Link to="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] to-[#0d0d18]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {industry.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
                  <ChevronRight className="w-5 h-5" />
                  <span className="text-lg font-semibold">{stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions for Industry */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d18] via-[#0a0a12] to-[#0a0a12]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Solutions for {industry.name}
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our comprehensive AI automation solutions tailored for your industry.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <Link
                key={service.id}
                to={service.href}
                className="group bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection
        faqs={faqs}
        subheading={`How Lanos Logic applies AI automation to ${industry.name}.`}
      />

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your {industry.name} Business?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Let our experts help you implement AI automation solutions tailored to your needs.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-10 h-14 gap-2 shadow-lg shadow-amber-500/25"
            asChild
          >
            <Link to="/contact">
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default IndustryPage;
