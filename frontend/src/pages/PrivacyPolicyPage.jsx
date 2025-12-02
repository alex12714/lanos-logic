import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';

const PrivacyPolicyPage = () => {
  const lastUpdated = 'July 1, 2025';

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy <span className="text-amber-400">Policy</span>
          </h1>
          <p className="text-gray-400">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] to-[#0d0d18]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-8 md:p-12 space-y-8">
            
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-400 leading-relaxed">
                Lanos Logic (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI automation services, visit our website, or engage with our platforms. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We collect information that you provide directly to us, as well as information collected automatically when you use our services:
              </p>
              
              <h3 className="text-lg font-semibold text-amber-400 mb-2">2.1 Personal Information</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4 ml-4">
                <li>Name, email address, phone number, and company name</li>
                <li>Billing information and payment details</li>
                <li>Account credentials and authentication data</li>
                <li>Communication preferences and correspondence</li>
              </ul>

              <h3 className="text-lg font-semibold text-amber-400 mb-2">2.2 Business Data</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4 ml-4">
                <li>Data processed through our AI automation services</li>
                <li>Workflow configurations and integration settings</li>
                <li>Documents and files uploaded for processing</li>
                <li>Customer interaction data processed by AI agents</li>
              </ul>

              <h3 className="text-lg font-semibold text-amber-400 mb-2">2.3 Technical Information</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>IP address, browser type, and device information</li>
                <li>Usage data, analytics, and performance metrics</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Log files and system diagnostics</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Providing, maintaining, and improving our AI automation services</li>
                <li>Processing transactions and managing your account</li>
                <li>Training and improving our AI models (using anonymized data only)</li>
                <li>Communicating with you about services, updates, and support</li>
                <li>Analyzing usage patterns to enhance user experience</li>
                <li>Ensuring security and preventing fraud</li>
                <li>Complying with legal obligations and enforcing our terms</li>
              </ul>
            </div>

            {/* AI-Specific Data Practices */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. AI-Specific Data Practices</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                As an AI service provider, we take additional measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li><strong className="text-white">Data Isolation:</strong> Your business data is processed in isolated environments and not shared with other clients</li>
                <li><strong className="text-white">Model Training:</strong> We do not use your proprietary business data to train our AI models without explicit consent</li>
                <li><strong className="text-white">Data Retention:</strong> AI processing data is retained only as long as necessary to provide services</li>
                <li><strong className="text-white">Human Review:</strong> AI outputs may be reviewed by our team for quality assurance, subject to strict confidentiality</li>
                <li><strong className="text-white">Third-Party AI:</strong> When using third-party AI services (e.g., Claude AI), your data is subject to their respective privacy policies</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li><strong className="text-white">Service Providers:</strong> With trusted partners who assist in operating our services (e.g., cloud hosting, payment processing)</li>
                <li><strong className="text-white">Integration Partners:</strong> With platforms you choose to integrate (e.g., Make.com, Twilio, GoHighLevel)</li>
                <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li><strong className="text-white">Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong className="text-white">With Consent:</strong> When you have given explicit permission</li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
              <p className="text-gray-400 leading-relaxed">
                We implement industry-standard security measures to protect your data, including encryption in transit and at rest, access controls, regular security audits, and secure development practices. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Data portability to another service provider</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies and Tracking</h2>
              <p className="text-gray-400 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage cookie preferences through your browser settings. Essential cookies are required for basic functionality and cannot be disabled.
              </p>
            </div>

            {/* International Transfers */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Data Transfers</h2>
              <p className="text-gray-400 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including standard contractual clauses and compliance with applicable data protection frameworks.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-400 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-white font-semibold mb-2">Lanos Logic</p>
                <p className="text-gray-400">24 E Washington St Suite 875</p>
                <p className="text-gray-400">Chicago, IL 60602</p>
                <p className="text-gray-400 mt-2">Email: <a href="mailto:hello@lanos-logic.com" className="text-amber-400 hover:text-amber-300">hello@lanos-logic.com</a></p>
                <p className="text-gray-400">Phone: <a href="tel:+15188643528" className="text-amber-400 hover:text-amber-300">+1 (518) 864 3528</a></p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicyPage;
