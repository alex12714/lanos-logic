import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

// On-brand FAQ block backed by FAQPage JSON-LD. Reuses the existing radix
// Accordion design system. The JSON-LD is rendered inline alongside the visible
// Q&As so the structured data always matches what users see.
const FaqSection = ({
  faqs,
  heading = 'Frequently Asked Questions',
  subheading,
}) => {
  if (!faqs || faqs.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl px-6 [&:last-child]:border-b"
            >
              <AccordionTrigger className="text-white text-left text-base sm:text-lg font-semibold hover:no-underline hover:text-amber-400 [&>svg]:text-amber-400">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default FaqSection;
