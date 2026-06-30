import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Phone, FileText, Workflow, Share2, MessageSquare, Smartphone, BarChart3, Database, ScanLine, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';
import { services } from '../../data/mock';
import FadeInUp from '../common/FadeInUp';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const iconMap = {
  Bot, Phone, FileText, Workflow, Share2, MessageSquare, Smartphone, BarChart3, Database, ScanLine, ShieldAlert, ShieldCheck, Sparkles,
};

const ServicesSection = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Comprehensive AI Solutions
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We provide a set of advanced AI platforms and processes that help our
            clients automate their business operations and enhance customer experiences.
          </p>
        </FadeInUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Bot;
            return (
              <motion.div
                key={service.id}
                initial={prefersReduced ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-48px' }}
                transition={{
                  duration: 0.5,
                  delay: prefersReduced ? 0 : index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={service.href}
                  className="group block bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/5 h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                  <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:text-amber-300 transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
