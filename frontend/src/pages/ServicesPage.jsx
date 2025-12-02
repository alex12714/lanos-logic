import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Phone, FileText, Workflow, Share2, MessageSquare, Smartphone, BarChart3, Check } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { services } from '../data/mock';

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

const ServicesPage = () => {
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
              Our <span className="text-amber-400">AI Solutions</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Comprehensive AI automation services designed to transform your
              business operations and drive growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Bot;
              return (
                <div
                  key={service.id}
                  className="group bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {service.shortDescription}
                      </p>
                      
                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-amber-400" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link
                        to={service.href}
                        className="inline-flex items-center gap-2 text-amber-400 font-medium hover:text-amber-300 transition-colors group/link"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
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
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Not Sure Which Solution Is Right for You?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Let our experts analyze your business needs and recommend the perfect
            automation solution.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-10 h-14 gap-2 shadow-lg shadow-amber-500/25 transition-all duration-300"
            asChild
          >
            <Link to="/contact">
              Schedule a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
