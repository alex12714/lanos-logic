import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, ArrowLeft, Bot, Phone, FileText, Workflow, Share2, MessageSquare, Smartphone, BarChart3 } from 'lucide-react';
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

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
            <Link to="/services" className="text-amber-400 hover:text-amber-300">
              Back to Services
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const IconComponent = iconMap[service.icon] || Bot;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-8">
                <IconComponent className="w-10 h-10 text-amber-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {service.name}
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {service.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-8 h-14 gap-2"
                  asChild
                >
                  <Link to="/contact">
                    Book a Demo
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
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <IconComponent className="w-32 h-32 text-amber-400/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-gray-400 text-lg">
              Our {service.name.toLowerCase()} are designed to handle a wide range of tasks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-8 text-center hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Business Benefits</h2>
            <p className="text-gray-400 text-lg">
              Implementing {service.name.toLowerCase()} can transform your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1a2e]/50 to-[#16162a]/50 border border-white/5 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-amber-400 mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
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
            Ready to Transform Your Business with {service.name}?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Schedule a free discovery call with our experts.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-10 h-14 gap-2 shadow-lg shadow-amber-500/25"
            asChild
          >
            <Link to="/contact">
              Book Your Discovery Call Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetailPage;
