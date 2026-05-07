import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { industries } from '../../data/mock';
import FadeInUp from '../common/FadeInUp';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const IndustriesSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const prefersReduced = useReducedMotion();

  const filters = [
    { id: 'all', label: 'All Industries' },
    { id: 'regulated', label: 'Government & Regulated' },
    { id: 'agencies', label: 'Agencies' },
    { id: 'enterprise', label: 'Enterprise' },
  ];

  const filteredIndustries = industries.filter((industry) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'regulated')
      return ['government', 'pharmaceutical', 'life-sciences', 'legal'].includes(industry.id);
    if (activeFilter === 'agencies')
      return ['marketing', 'sales'].includes(industry.id);
    return !['marketing', 'sales', 'government', 'pharmaceutical', 'life-sciences', 'legal'].includes(industry.id);
  });

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Serving Multiple Industries
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our AI automation solutions are tailored to meet the unique needs of
            various industries and business types.
          </p>
        </FadeInUp>

        {/* Filter Tabs */}
        <FadeInUp delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/25'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </FadeInUp>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredIndustries.map((industry, index) => (
              <motion.div
                key={industry.id}
                layout
                initial={prefersReduced ? false : { opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={prefersReduced ? {} : { opacity: 0, scale: 0.95, y: -10 }}
                transition={{
                  duration: 0.4,
                  delay: prefersReduced ? 0 : index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              >
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {industry.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{industry.description}</p>
                <ul className="space-y-2 mb-6">
                  {industry.stats.map((stat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                      <span className="text-gray-300">{stat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={industry.href}
                  className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors group/link"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
