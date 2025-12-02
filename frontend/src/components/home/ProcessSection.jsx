import React from 'react';
import { processSteps } from '../../data/mock';

const ProcessSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our 3-Step Process in a Nutshell
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We follow a proven methodology to implement AI solutions that deliver
            measurable results.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-amber-500/50 via-amber-400/30 to-amber-500/50" />
          
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="relative text-center"
            >
              {/* Step Number */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
                <span className="text-xl font-bold text-black">{step.step}</span>
              </div>
              
              {/* Content Card */}
              <div className="bg-gradient-to-br from-[#1a1a2e]/50 to-[#16162a]/50 border border-white/5 rounded-2xl p-6 hover:border-amber-500/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-amber-400 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-center text-gray-300 mt-12 text-lg">
          Faster money collection and faster onboarding!
        </p>
      </div>
    </section>
  );
};

export default ProcessSection;
