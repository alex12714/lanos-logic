import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';

const TermsOfServicePage = () => {
  const lastUpdated = 'July 1, 2025';

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
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
            Terms of <span className="text-amber-400">Service</span>
          </h1>
          <p className="text-gray-400">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] to-[#0d0d18]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-8 md:p-12 space-y-8">
            
            {/* Agreement */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                By accessing or using Lanos Logic&apos;s AI automation services, website, or any related platforms (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access or use our Services. These Terms constitute a legally binding agreement between you and Lanos Logic.
              </p>
            </div>

            {/* Services Description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Lanos Logic provides AI-powered automation solutions including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>AI Agents for customer interactions and task automation</li>
                <li>Voice AI solutions for call handling and communication</li>
                <li>Document automation and intelligent processing</li>
                <li>Business process automation and workflow optimization</li>
                <li>Social media and communication automation</li>
                <li>Mobile application development and integration</li>
                <li>Analytics, reporting, and business intelligence</li>
              </ul>
            </div>

            {/* Account Terms */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Account Registration and Security</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                To access certain features, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as needed</li>
                <li>Keep your login credentials secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </div>

            {/* Acceptable Use */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use Policy</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                You agree not to use our Services to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Transmit malicious code, viruses, or harmful content</li>
                <li>Engage in fraudulent, deceptive, or misleading activities</li>
                <li>Harass, abuse, or harm other users or individuals</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the integrity of our Services</li>
                <li>Use AI agents to impersonate real individuals without consent</li>
                <li>Generate or distribute illegal, harmful, or objectionable content</li>
                <li>Reverse engineer, decompile, or extract source code</li>
                <li>Exceed usage limits or circumvent access restrictions</li>
              </ul>
            </div>

            {/* AI-Specific Terms */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. AI Services Terms</h2>
              
              <h3 className="text-lg font-semibold text-amber-400 mb-2">5.1 AI Output Disclaimer</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                AI-generated outputs are provided &quot;as is&quot; and may contain errors, inaccuracies, or biases. You are responsible for reviewing and verifying all AI outputs before use. We do not guarantee the accuracy, completeness, or suitability of AI-generated content for any particular purpose.
              </p>

              <h3 className="text-lg font-semibold text-amber-400 mb-2">5.2 Human Oversight</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                You agree to maintain appropriate human oversight of AI operations, especially for critical business decisions, customer communications, and legally significant actions.
              </p>

              <h3 className="text-lg font-semibold text-amber-400 mb-2">5.3 Third-Party AI Services</h3>
              <p className="text-gray-400 leading-relaxed">
                Our Services may incorporate third-party AI technologies (e.g., Claude AI, OpenAI). Your use of such technologies is also subject to the respective third-party terms and policies.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property Rights</h2>
              
              <h3 className="text-lg font-semibold text-amber-400 mb-2">6.1 Our Property</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                The Services, including all software, algorithms, designs, trademarks, and content, are owned by Lanos Logic and protected by intellectual property laws. You receive a limited, non-exclusive, non-transferable license to use the Services as permitted by these Terms.
              </p>

              <h3 className="text-lg font-semibold text-amber-400 mb-2">6.2 Your Content</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                You retain ownership of data and content you provide to us. By using our Services, you grant us a limited license to process, store, and use your content solely to provide and improve our Services.
              </p>

              <h3 className="text-lg font-semibold text-amber-400 mb-2">6.3 AI-Generated Content</h3>
              <p className="text-gray-400 leading-relaxed">
                Subject to applicable law and these Terms, you own the outputs generated by our AI Services using your inputs, provided you comply with all terms and have paid applicable fees.
              </p>
            </div>

            {/* Payment Terms */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Payment and Billing</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Fees are based on your selected service plan and usage</li>
                <li>Payment is due according to the agreed billing cycle</li>
                <li>All fees are non-refundable unless otherwise specified</li>
                <li>We reserve the right to modify pricing with 30 days notice</li>
                <li>Failure to pay may result in service suspension or termination</li>
                <li>You are responsible for all applicable taxes</li>
              </ul>
            </div>

            {/* Confidentiality */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Confidentiality</h2>
              <p className="text-gray-400 leading-relaxed">
                Both parties agree to maintain the confidentiality of proprietary information disclosed during the course of our business relationship. This includes business data, technical information, pricing, and any information marked as confidential. This obligation survives termination of these Terms.
              </p>
            </div>

            {/* Disclaimers */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Disclaimers</h2>
              <p className="text-gray-400 leading-relaxed mb-4 uppercase text-sm">
                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We do not warrant that the Services will be uninterrupted, error-free, or completely secure. AI outputs may contain errors and should be verified before use in critical applications.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-400 leading-relaxed mb-4 uppercase text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, LANOS LOGIC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our total liability shall not exceed the amounts paid by you to us in the twelve (12) months preceding the claim. Some jurisdictions do not allow certain limitations, so some of the above may not apply to you.
              </p>
            </div>

            {/* Indemnification */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
              <p className="text-gray-400 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Lanos Logic and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">12. Termination</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Either party may terminate the service agreement with 30 days written notice. We may suspend or terminate your access immediately if you breach these Terms. Upon termination:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li>Your right to use the Services will cease immediately</li>
                <li>You remain liable for any outstanding fees</li>
                <li>We will provide reasonable assistance to export your data</li>
                <li>Provisions that should survive termination will remain in effect</li>
              </ul>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law and Disputes</h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms are governed by the laws of the State of Illinois, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration in Chicago, Illinois, except that either party may seek injunctive relief in court for intellectual property violations.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">14. Changes to Terms</h2>
              <p className="text-gray-400 leading-relaxed">
                We reserve the right to modify these Terms at any time. Material changes will be communicated via email or prominent notice on our website at least 30 days before taking effect. Continued use of the Services after changes constitutes acceptance of the modified Terms.
              </p>
            </div>

            {/* Miscellaneous */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">15. Miscellaneous</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                <li><strong className="text-white">Entire Agreement:</strong> These Terms constitute the entire agreement between you and Lanos Logic</li>
                <li><strong className="text-white">Severability:</strong> If any provision is found unenforceable, other provisions remain in effect</li>
                <li><strong className="text-white">Waiver:</strong> Failure to enforce any right does not waive future enforcement</li>
                <li><strong className="text-white">Assignment:</strong> You may not assign these Terms without our written consent</li>
                <li><strong className="text-white">Force Majeure:</strong> Neither party is liable for delays due to circumstances beyond reasonable control</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">16. Contact Information</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
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

export default TermsOfServicePage;
