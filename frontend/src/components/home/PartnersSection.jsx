import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { platformLogos } from '../../data/mock';

const PartnersSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Block */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Helping Businesses Automate Their Revenue
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            With powerful automation platforms like Make.com, AirTable, DocuSign,
            Miro, GoHighLevel, Pandadoc, and Twilio, we craft bespoke workflows
            and apps specific to your business.
          </p>
          <p className="text-gray-300 mb-8">
            We specialize in serving{' '}
            <span className="text-amber-400 font-medium">marketing agencies</span>,{' '}
            <span className="text-amber-400 font-medium">sales agencies</span>, and{' '}
            <span className="text-amber-400 font-medium">businesses across multiple verticals</span>{' '}
            with tailored automation solutions that drive growth and efficiency.
          </p>
          <p className="text-xl text-white font-medium mb-8">
            Ready for the leap? We're here to make it count.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-8 h-14 gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link to="/contact">
              Book a Call Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Platform Logos */}
        <div className="bg-gradient-to-br from-[#1a1a2e]/50 to-[#16162a]/50 border border-white/5 rounded-3xl p-8">
          <h3 className="text-center text-gray-400 mb-8 text-sm font-medium tracking-wider uppercase">
            Powered by Industry-Leading Platforms
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
            {platformLogos.map((platform, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden group-hover:bg-white/10 transition-all duration-300 group-hover:scale-110">
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-10 h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-10 h-10 rounded bg-gradient-to-br from-amber-500/30 to-purple-500/30 flex items-center justify-center">
                          <span class="text-white text-xs font-bold">${platform.name.substring(0, 2)}</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
