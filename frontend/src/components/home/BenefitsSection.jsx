import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Heart, DollarSign, TrendingUp, Lightbulb, LineChart } from 'lucide-react';
import { benefits } from '../../data/mock';
import FadeInUp from '../common/FadeInUp';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const iconMap = { Zap, Heart, DollarSign, TrendingUp, Lightbulb, LineChart };

const BenefitsSection = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Transform Your Business Operations
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our AI solutions help businesses streamline operations, reduce costs,
            and drive growth.
          </p>
        </FadeInUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon] || Zap;
            return (
              <motion.div
                key={index}
                className="group bg-gradient-to-br from-[#1a1a2e]/50 to-[#16162a]/50 border border-white/5 rounded-2xl p-6 hover:border-amber-500/20 transition-all duration-500"
                initial={prefersReduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-48px' }}
                transition={{
                  duration: 0.5,
                  delay: prefersReduced ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
