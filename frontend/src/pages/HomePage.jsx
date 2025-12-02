import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import AIToolsSection from '../components/home/AIToolsSection';
import PartnersSection from '../components/home/PartnersSection';
import IndustriesSection from '../components/home/IndustriesSection';
import ServicesSection from '../components/home/ServicesSection';
import CaseStudiesSection from '../components/home/CaseStudiesSection';
import BenefitsSection from '../components/home/BenefitsSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';
import ContactFormSection from '../components/home/ContactFormSection';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <AIToolsSection />
      <PartnersSection />
      <IndustriesSection />
      <ServicesSection />
      <CaseStudiesSection />
      <BenefitsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <ContactFormSection />
    </Layout>
  );
};

export default HomePage;
