import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { caseStudies } from '../data/mock';

const CaseStudiesPage = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Case Studies' },
    { id: 'Marketing Agency', label: 'Marketing' },
    { id: 'Sales Agency', label: 'Sales' },
    { id: 'Real Estate', label: 'Real Estate' }
  ];

  const filteredStudies = caseStudies.filter(study => 
    filter === 'all' || study.category === filter
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Client <span className="text-amber-400">Success Stories</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Discover how our AI automation solutions have transformed businesses
              across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] to-[#0d0d18]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/25'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d18] via-[#0a0a12] to-[#0a0a12]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                className="group bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
                          <span class="text-gray-400 text-sm">Case Study</span>
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
                    {study.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {study.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    {study.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-amber-400 font-bold">{stat.value}</span>
                        <span className="text-gray-400 text-sm">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-white/10 text-gray-400 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link
                    to={study.href}
                    className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors group/link"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Let's discuss how we can help transform your business with AI automation.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-10 h-14 gap-2 shadow-lg shadow-amber-500/25"
            asChild
          >
            <Link to="/contact">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudiesPage;
