import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { BookingProvider } from './context/BookingContext';

// Pages are eagerly imported. Route-level code-splitting (React.lazy) was
// tried but, with the prerendered HTML + client createRoot, it flashed the
// Suspense fallback over server content on first paint; hydrateRoot instead
// produced React #418 hydration mismatches (framer-motion initial state).
// A clean split needs SSR-aware lazy loading + resolving those mismatches —
// tracked separately. gzip already covers the transfer cost of the bundle.
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import ContactPage from './pages/ContactPage';
import IndustryPage from './pages/IndustryPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import BookPage from './pages/BookPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BookingProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:caseStudyId" element={<CaseStudyDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/industries/:industryId" element={<IndustryPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </BookingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
