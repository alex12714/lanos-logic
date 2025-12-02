import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Phone, FileText, Workflow, Share2, MessageSquare, Smartphone, BarChart3 } from 'lucide-react';
import { services } from '../../data/mock';

const iconMap = {
  Bot: Bot,
  Phone: Phone,
  FileText: FileText,
  Workflow: Workflow,
  Share2: Share2,
  MessageSquare: MessageSquare,
  Smartphone: Smartphone,
  BarChart3: BarChart3
};

const ServicesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Comprehensive AI Solutions
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We provide a set of advanced AI platforms and processes that help our
            clients automate their business operations and enhance customer
            experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Bot;
            return (
              <Link
                key={service.id}
                to={service.href}
                className="group bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/5"
                style={{ animationDelay: `${index * 50}ms` }}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
