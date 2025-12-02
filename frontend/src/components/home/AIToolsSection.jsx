import React from 'react';
import { Bot, Brain, Sparkles } from 'lucide-react';

const AIToolsSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Advanced AI Tools for Your Business
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We leverage cutting-edge AI technologies to create intelligent
            solutions that transform your business operations.
          </p>
        </div>

        {/* Claude AI Feature */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Claude AI</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Leverage Claude&apos;s Advanced Capabilities
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Leverage Claude&apos;s advanced natural language capabilities to create
              intelligent conversational agents that understand context and
              deliver human-like interactions with your customers.
            </p>
            <ul className="space-y-3">
              {[
                'Advanced Natural Language Processing',
                'Context-Aware Responses',
                'Multi-Turn Conversations',
                'Seamless Integration'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8 overflow-hidden">
              <img
                src="https://www.lanos-logic.com/claude-ai-showcase.png"
                alt="Claude AI Showcase"
                className="w-full rounded-xl shadow-2xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="aspect-video bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-xl flex items-center justify-center">
                      <div class="text-center">
                        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span class="text-gray-400">AI-Powered Solutions</span>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
        </div>

        {/* Expand Digital Presence */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8 hover:border-amber-500/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Bot className="w-7 h-7 text-amber-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Mobile App Development</h4>
            <p className="text-gray-400 mb-4">
              Custom Flutter applications that integrate with your business systems
              and automation workflows.
            </p>
            <ul className="space-y-2">
              {['Cross-platform Development', 'Native Performance', 'Seamless Integration'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl p-8 hover:border-purple-500/30 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Twilio Integration</h4>
            <p className="text-gray-400 mb-4">
              Powerful communication tools for SMS, voice, and messaging to reach
              your customers everywhere.
            </p>
            <ul className="space-y-2">
              {['SMS Campaigns', 'Voice Broadcasting', 'WhatsApp Integration'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
