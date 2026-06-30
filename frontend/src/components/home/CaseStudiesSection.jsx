import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { allCaseStudies, featuredCaseStudies } from '../../data/caseStudiesData';
import FadeInUp from '../common/FadeInUp';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CaseStudiesSection = () => {
  const prefersReduced = useReducedMotion();
  const featured = featuredCaseStudies
    .map((id) => allCaseStudies.find((s) => s.id === id))
    .filter(Boolean)
    .slice(0, 6);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp className="text-center mb-16">
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">
            {allCaseStudies.length}+ Completed Projects
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Real automations. <span className="text-amber-400">Measurable results.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Not demos — shipped projects with the numbers to prove it: thousands of
            hours saved, staff redeployed, and revenue recovered across real
            businesses.
          </p>
        </FadeInUp>

        {/* Featured Grid — 2 large */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {featured.slice(0, 2).map((study, index) => (
            <motion.div
              key={study.id}
              initial={prefersReduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-48px' }}
              transition={{
                duration: 0.55,
                delay: prefersReduced ? 0 : index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to={study.href}
                className="group block bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.01]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50 flex items-center justify-center"><div class="text-center p-8"><span class="text-gray-300 text-sm font-medium">${study.category}</span></div></div>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      {study.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {study.stats.slice(0, 3).map((stat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold text-sm">{stat.value}</span>
                        <span className="text-gray-500 text-xs">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:text-amber-300 transition-colors">
                    Read Case Study
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 4 smaller cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featured.slice(2, 6).map((study, index) => (
            <motion.div
              key={study.id}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-48px' }}
              transition={{
                duration: 0.5,
                delay: prefersReduced ? 0 : index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to={study.href}
                className="group block bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40 flex items-center justify-center"><span class="text-gray-400 text-sm">${study.category}</span></div>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <Badge className="bg-white/5 text-gray-400 border-white/10 text-xs mb-2">
                    {study.category}
                  </Badge>
                  <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                    {study.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold text-sm">{study.stats[0]?.value}</span>
                    <span className="text-gray-500 text-xs line-clamp-1">{study.stats[0]?.label}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <FadeInUp delay={0.2} className="text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-400 border border-amber-500/20 rounded-full px-8 py-4 font-medium transition-all duration-300 hover:scale-105"
          >
            View All {allCaseStudies.length} Case Studies
            <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeInUp>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
