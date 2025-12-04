import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { navLinks } from '../../data/mock';
import { useBooking } from '../../context/BookingContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openBookingModal, openCallbackModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a12]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/favicon.ico" 
              alt="Lanos Logic" 
              className="w-10 h-10 rounded-lg transform group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              Lanos <span className="text-amber-400">Logic</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-amber-400 ${
                  location.pathname === link.href
                    ? 'text-amber-400'
                    : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={openCallbackModal}
              variant="outline"
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 rounded-full px-5 h-10 gap-2 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Request Call Back
            </Button>
            <Button
              onClick={openBookingModal}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-5 h-10 gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
            >
              Book a Call
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5 rounded-full px-5 h-10 transition-all duration-300"
              asChild
            >
              <Link to="/contact">Client Portal</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0a12]/98 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`block text-lg font-medium py-2 transition-colors ${
                location.pathname === link.href
                  ? 'text-amber-400'
                  : 'text-gray-300 hover:text-amber-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 space-y-3">
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full h-12"
            >
              Book a Call
            </Button>
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openCallbackModal();
              }}
              variant="outline"
              className="w-full border-purple-500/50 text-purple-300 rounded-full h-12"
            >
              Request Call Back
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
