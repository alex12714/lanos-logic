import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { BookingProvider } from './context/BookingContext';
import RouteFallback from './components/common/RouteFallback';

// Pages — route-level code splitting. Each page becomes its own lazy-loaded
// chunk so the initial JS payload only carries the shell + the matched route.
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const IndustryPage = lazy(() => import('./pages/IndustryPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'));
const BookPage = lazy(() => import('./pages/BookPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BookingProvider>
          <Suspense fallback={<RouteFallback />}>
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
          </Suspense>
        </BookingProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
