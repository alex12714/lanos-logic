import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Phone, ArrowRight, ChevronDown,
  Bot, Workflow, Share2, MessageSquare, Database,
  BarChart3, FileText, Smartphone, ScanLine, ShieldAlert, ShieldCheck,
  ExternalLink, Grid3x3,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useBooking } from '../../context/BookingContext';

/* ── dropdown data ─────────────────────────────────────────────────────────── */
const serviceGroups = [
  {
    label: 'AI & Automation',
    color: 'text-amber-400',
    items: [
      { name: 'AI Agents',               href: '/services/ai-agents',                icon: Bot,            desc: 'Intelligent automation, 24/7' },
      { name: 'Voice AI Agents',         href: '/services/voice-ai-agents',          icon: Phone,          desc: 'Natural voice interactions' },
      { name: 'Process Automation',      href: '/services/process-automation',       icon: Workflow,       desc: 'End-to-end workflow automation' },
      { name: 'Social Media Automation', href: '/services/social-media-automation',  icon: Share2,         desc: 'AI content & scheduling' },
      { name: 'Communication Automation',href: '/services/communication-automation', icon: MessageSquare,  desc: 'SMS, voice & multi-channel' },
    ],
  },
  {
    label: 'Data & Intelligence',
    color: 'text-purple-400',
    items: [
      { name: 'Vector Database Solutions', href: '/services/vector-database-solutions', icon: Database,   desc: 'Semantic search at scale' },
      { name: 'Analytics & Insights',      href: '/services/analytics-insights',        icon: BarChart3,  desc: 'Data-driven decisions' },
      { name: 'Document Automation',       href: '/services/document-automation',       icon: FileText,   desc: 'Intelligent document processing' },
      { name: 'Mobile App Development',    href: '/services/mobile-app-development',    icon: Smartphone, desc: 'Cross-platform Flutter apps' },
    ],
  },
  {
    label: 'Security',
    color: 'text-red-400',
    items: [
      { name: 'Vulnerability Scanning', href: '/services/security-vulnerability-scanning', icon: ScanLine,    desc: 'OWASP & CVE detection' },
      { name: 'Penetration Testing',    href: '/services/penetration-testing',             icon: ShieldAlert, desc: 'Adversarial security testing' },
      { name: 'Systems Hardening',      href: '/services/systems-hardening',               icon: ShieldCheck, desc: 'CIS & NIST-aligned hardening' },
    ],
  },
];

/* navLinks without Solutions — we render Solutions manually */
const simpleNavLinks = [
  { label: 'About Us',     href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog',         href: '/blog' },
  { label: 'Contact',      href: '/contact' },
];

/* ── component ─────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileOpen, setIsMobileOpen]     = useState(false);
  const [solutionsOpen, setSolutionsOpen]   = useState(false);   // desktop hover
  const [mobileSolOpen, setMobileSolOpen]   = useState(false);   // mobile accordion
  const dropdownRef = useRef(null);
  const location    = useLocation();
  const { openBookingModal, openCallbackModal } = useBooking();

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mobile on route change */
  useEffect(() => {
    setIsMobileOpen(false);
    setMobileSolOpen(false);
  }, [location.pathname]);

  /* close desktop dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isServiceActive = location.pathname.startsWith('/services');

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
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
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
          <div className="hidden lg:flex items-center gap-6">

            {/* Home */}
            <Link
              to="/"
              className={`text-sm font-medium transition-all duration-300 hover:text-amber-400 ${
                location.pathname === '/' ? 'text-amber-400' : 'text-gray-300'
              }`}
            >
              Home
            </Link>

            {/* Solutions dropdown trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSolutionsOpen((v) => !v)}
                className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:text-amber-400 ${
                  isServiceActive || solutionsOpen ? 'text-amber-400' : 'text-gray-300'
                }`}
              >
                Solutions
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Mega dropdown panel */}
              {solutionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-[#0f0f1e]/98 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
                  {/* Header row */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Grid3x3 className="w-4 h-4 text-amber-400" />
                      All Solutions
                    </div>
                    <Link
                      to="/services"
                      onClick={() => setSolutionsOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium"
                    >
                      View all services
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Groups grid */}
                  <div className="grid grid-cols-3 gap-0 divide-x divide-white/5">
                    {serviceGroups.map((group) => (
                      <div key={group.label} className="p-5">
                        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${group.color}`}>
                          {group.label}
                        </p>
                        <ul className="space-y-1">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <li key={item.href}>
                                <Link
                                  to={item.href}
                                  onClick={() => setSolutionsOpen(false)}
                                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group/item"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-amber-500/15 transition-colors">
                                    <Icon className="w-4 h-4 text-gray-400 group-hover/item:text-amber-400 transition-colors" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-200 group-hover/item:text-white transition-colors leading-tight">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5 leading-tight">{item.desc}</p>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Footer CTA */}
                  <div className="px-6 py-3 bg-white/2 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-gray-500">Not sure where to start?</p>
                    <Link
                      to="/contact"
                      onClick={() => setSolutionsOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Book a free consultation
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Simple links */}
            {simpleNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-amber-400 ${
                  location.pathname === link.href ? 'text-amber-400' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
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

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileOpen((v) => !v)}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0a12]/98 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isMobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-5 space-y-1">

          {/* Home */}
          <Link
            to="/"
            className={`block px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
              location.pathname === '/' ? 'text-amber-400 bg-amber-500/5' : 'text-gray-300 hover:text-amber-400 hover:bg-white/5'
            }`}
          >
            Home
          </Link>

          {/* Solutions accordion */}
          <div>
            <button
              onClick={() => setMobileSolOpen((v) => !v)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                isServiceActive || mobileSolOpen
                  ? 'text-amber-400 bg-amber-500/5'
                  : 'text-gray-300 hover:text-amber-400 hover:bg-white/5'
              }`}
            >
              Solutions
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileSolOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileSolOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-3 pt-1 pb-2 space-y-4">
                {serviceGroups.map((group) => (
                  <div key={group.label}>
                    <p className={`text-xs font-bold uppercase tracking-widest px-3 mb-1.5 ${group.color}`}>
                      {group.label}
                    </p>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                ))}
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
                >
                  View all services
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Simple links */}
          {simpleNavLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`block px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                location.pathname === link.href
                  ? 'text-amber-400 bg-amber-500/5'
                  : 'text-gray-300 hover:text-amber-400 hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA buttons */}
          <div className="pt-3 pb-1 space-y-2.5 border-t border-white/5 mt-3">
            <Button
              onClick={() => { setIsMobileOpen(false); openBookingModal(); }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full h-12"
            >
              Book a Call
            </Button>
            <Button
              onClick={() => { setIsMobileOpen(false); openCallbackModal(); }}
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
