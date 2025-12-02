import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { heroFeatures } from '../../data/mock';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[#0a0a12]">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Stars/Particles - Pre-generated positions */}
        <div className="absolute inset-0">
          {[
            { left: '5%', top: '10%', delay: '0s', duration: '3s' },
            { left: '15%', top: '25%', delay: '0.5s', duration: '4s' },
            { left: '25%', top: '15%', delay: '1s', duration: '3.5s' },
            { left: '35%', top: '45%', delay: '1.5s', duration: '2.5s' },
            { left: '45%', top: '8%', delay: '2s', duration: '4.5s' },
            { left: '55%', top: '35%', delay: '0.3s', duration: '3.2s' },
            { left: '65%', top: '55%', delay: '0.8s', duration: '2.8s' },
            { left: '75%', top: '20%', delay: '1.2s', duration: '3.8s' },
            { left: '85%', top: '40%', delay: '1.8s', duration: '4.2s' },
            { left: '95%', top: '12%', delay: '2.5s', duration: '3s' },
            { left: '10%', top: '60%', delay: '0.2s', duration: '3.3s' },
            { left: '20%', top: '75%', delay: '0.7s', duration: '4.1s' },
            { left: '30%', top: '85%', delay: '1.3s', duration: '2.9s' },
            { left: '40%', top: '70%', delay: '1.9s', duration: '3.7s' },
            { left: '50%', top: '90%', delay: '2.2s', duration: '4.3s' },
            { left: '60%', top: '80%', delay: '0.4s', duration: '3.1s' },
            { left: '70%', top: '65%', delay: '1.1s', duration: '2.7s' },
            { left: '80%', top: '78%', delay: '1.6s', duration: '3.9s' },
            { left: '90%', top: '88%', delay: '2.1s', duration: '4.4s' },
            { left: '8%', top: '30%', delay: '0.6s', duration: '3.4s' },
          ].map((star, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-twinkle"
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
                animationDuration: star.duration
              }}
            />
          ))}
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-white">Strategic </span>
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              AI Automations
            </span>
            <br />
            <span className="text-white">For Modern Businesses</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Plug in AI experts to power your business processes, customer
            interactions, and revenue automations with cutting-edge artificial
            intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-8 h-14 gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/contact">
                Book Your Discovery Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 rounded-full px-8 h-14 gap-2 transition-all duration-300"
              asChild
            >
              <Link to="/contact">
                <Phone className="w-5 h-5" />
                Request Call Back
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 rounded-full px-8 h-14 transition-all duration-300"
              asChild
            >
              <Link to="/services">View Our Solutions</Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-12">
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
              {heroFeatures.map((feature, index) => (
                <React.Fragment key={feature}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-200 text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                  {index < heroFeatures.length - 1 && (
                    <span className="text-amber-500/50">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a12] to-transparent" />
    </section>
  );
};

export default HeroSection;
