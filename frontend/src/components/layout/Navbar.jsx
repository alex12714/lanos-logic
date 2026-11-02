import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useBooking } from '../../context/BookingContext';
import { categories } from '../../data/categories';
import { serviceIcon } from '../../lib/serviceIcons';

/* Which category does the current page belong to (category page or one of its services)? */
const categoryForPath = (pathname) =>
  categories.find(
    (c) => pathname === c.href || c.services.some((sv) => pathname === `/services/${sv.id}`)
  );

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
  const [solutionsOpen, setSolutionsOpen]   = useState(false);   // desktop mega menu
  const [mobileSolOpen, setMobileSolOpen]   = useState(false);   // mobile accordion
  const [mobileCat, setMobileCat]           = useState(null);    // mobile: expanded category id
  const location    = useLocation();
  const [activeCat, setActiveCat]           = useState(categories[0].id);
  const closeTimer  = useRef(null);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    if (!solutionsOpen) setActiveCat((categoryForPath(location.pathname) || categories[0]).id);
    setSolutionsOpen(true);
  };
  const closeMenuSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 160);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);
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
    setMobileCat(null);
    setSolutionsOpen(false);
  }, [location.pathname]);

  /* close desktop menu on Escape */
  useEffect(() => {
    if (!solutionsOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setSolutionsOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [solutionsOpen]);

  const isServiceActive = location.pathname.startsWith('/services') || location.pathname.startsWith('/solutions');
  const active = categories.find((c) => c.id === activeCat) || categories[0];
  const isHomePage = location.pathname === '/';
  const hasBackground = isScrolled || !isHomePage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasBackground
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

            {/* Solutions trigger: hover opens the full-width menu, click goes to all services */}
            <div className="flex items-center" onMouseEnter={openMenu} onMouseLeave={closeMenuSoon}>
              <Link
                to="/services"
                onFocus={openMenu}
                className={`text-sm font-medium transition-all duration-300 hover:text-amber-400 ${
                  isServiceActive || solutionsOpen ? 'text-amber-400' : 'text-gray-300'
                }`}
              >
                Solutions
              </Link>
              <button
                type="button"
                aria-label="Show solutions menu"
                aria-expanded={solutionsOpen}
                onClick={() => (solutionsOpen ? setSolutionsOpen(false) : openMenu())}
                className={`ml-1 p-1 rounded-md transition-colors hover:text-amber-400 ${
                  isServiceActive || solutionsOpen ? 'text-amber-400' : 'text-gray-300'
                }`}
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>
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

      {/* Desktop mega menu: full width, categories | services | picture */}
      {solutionsOpen && (
        <div
          className="hidden lg:block absolute top-full left-0 right-0 bg-[#0c0c18] border-y border-white/10 shadow-2xl shadow-black/60"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenuSoon}
        >
          <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
            {/* 1. Categories */}
            <div className="col-span-3 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 px-3">Solutions</p>
              <ul className="space-y-1">
                {categories.map((c) => {
                  const isActive = c.id === active.id;
                  return (
                    <li key={c.id}>
                      <Link
                        to={c.href}
                        onMouseEnter={() => setActiveCat(c.id)}
                        onFocus={() => setActiveCat(c.id)}
                        className={`group flex items-center justify-between gap-3 px-3 py-3 rounded-xl border transition-colors ${
                          isActive ? 'bg-white/[0.06] border-white/10' : 'border-transparent hover:bg-white/[0.03]'
                        }`}
                      >
                        <span>
                          <span className={`block text-base font-semibold ${isActive ? c.accent : 'text-gray-200'}`}>{c.name}</span>
                          <span className="block text-xs text-gray-500 mt-0.5 leading-snug">{c.tagline}</span>
                        </span>
                        <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all ${isActive ? `${c.accent} translate-x-0.5` : 'text-gray-600'}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link to="/services" className="mt-auto pt-6 px-3 inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors">
                View all services
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. Services in the active category */}
            <div className="col-span-5 border-l border-white/5 pl-8">
              <p className={`text-xs font-bold uppercase tracking-widest mb-3 px-2 ${active.accent}`}>{active.name}</p>
              <ul className="space-y-1">
                {active.services.map((sv) => {
                  const Icon = serviceIcon(sv.icon);
                  return (
                    <li key={sv.id}>
                      <Link
                        to={`/services/${sv.id}`}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group/item"
                      >
                        <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-amber-500/15 transition-colors">
                          <Icon className="w-4 h-4 text-gray-400 group-hover/item:text-amber-400 transition-colors" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-gray-200 group-hover/item:text-white transition-colors leading-tight">{sv.navName}</span>
                          <span className="block text-xs text-gray-500 mt-0.5 leading-tight">{sv.desc}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 3. Category picture */}
            <Link to={active.href} className="col-span-4 group relative min-h-[300px] rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a2e]">
              <img
                key={active.image}
                src={active.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/40 to-transparent" />
              <span className="absolute bottom-0 left-0 right-0 p-5">
                <span className={`block text-xs font-bold uppercase tracking-widest mb-1 ${active.accent}`}>
                  {active.services.length} services
                </span>
                <span className="block text-xl font-bold text-white">{active.name}</span>
                <span className="block text-sm text-gray-300 mt-1 leading-snug">{active.tagline}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                  Explore {active.name}
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0a0a12] shadow-2xl shadow-black/60 border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isMobileOpen ? 'max-h-[calc(100vh-5rem)] overflow-y-auto opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-5 space-y-1">

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
              <div className="pl-3 pt-1 pb-2 space-y-1">
                {categories.map((c) => {
                  const open = mobileCat === c.id;
                  return (
                    <div key={c.id} className="rounded-xl">
                      <div className="flex items-center">
                        <Link
                          to={c.href}
                          className={`flex-1 px-3 py-2.5 text-sm font-semibold ${c.accent}`}
                        >
                          {c.name}
                        </Link>
                        <button
                          type="button"
                          aria-label={`Show ${c.name} services`}
                          aria-expanded={open}
                          onClick={() => setMobileCat(open ? null : c.id)}
                          className="p-2.5 text-gray-400 hover:text-white rounded-lg"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      {open && (
                        <div className="pb-2">
                          {c.services.map((sv) => {
                            const Icon = serviceIcon(sv.icon);
                            return (
                              <Link
                                key={sv.id}
                                to={`/services/${sv.id}`}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                <Icon className="w-4 h-4 flex-shrink-0" />
                                {sv.navName}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
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
