import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { caseStudies } from '../../data/mock';

const CaseStudiesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Client Success Stories
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover how our AI automation solutions have transformed businesses
            across various industries.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="group bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
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
                        <div class="text-center p-4">
                          <span class="text-gray-400 text-sm">Case Study Image</span>
                        </div>
                      </div>
                    `;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30">
                    {study.category}
                  </Badge>
                </div>
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
                  Read Case Study
                  <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white rounded-full px-8 py-4 font-medium transition-all duration-300 hover:transform hover:scale-105"
          >
            Load More Case Studies
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
