import React from 'react';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import FaqSection from '../components/common/FaqSection';
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
import { homeFaqs } from '../data/faqData';
import { ORG } from '../lib/seo';

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Lanos Logic Implements AI Automation',
  description:
    'Lanos Logic 3-phase process for deploying AI automation solutions that deliver measurable business results.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Analyze',
      text: 'Plan, analyze, and blueprint business processes using BPMN methodology and documentation to identify automation opportunities and ROI potential.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Prepare',
      text: 'Refine and align processes with future state planning, configure integrations, build data pipelines, and prepare the technical infrastructure.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Implement',
      text: 'Deploy automations that deliver immediate results, with performance monitoring and iterative optimization for peak efficiency.',
    },
  ],
};

// NOTE: Review schema intentionally NOT emitted. The testimonials in mock.js
// read as seed/placeholder data (generic company names, no verifiable source);
// publishing them as Review structured data would be misleading and risks
// Google review-spam penalties. Re-add real Reviews (with provenance) only
// once genuine, attributable client testimonials are available.

const HomePage = () => {
  return (
    <Layout>
      <Seo
        title="Lanos Logic — Strategic AI Automation Solutions for Modern Businesses"
        description="Lanos Logic builds AI agents, voice AI, document and process automation, vector databases, and mobile apps that help companies automate operations and scale efficiently. Book a free discovery call."
        path="/"
        jsonLd={[howToSchema]}
      />
      <HeroSection />
      <AIToolsSection />
      <PartnersSection />
      <IndustriesSection />
      <ServicesSection />
      <CaseStudiesSection />
      <BenefitsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection
        faqs={homeFaqs}
        subheading="Answers to the questions businesses ask most about AI automation with Lanos Logic."
      />
      <CTASection />
      <ContactFormSection />
    </Layout>
  );
};

export default HomePage;
