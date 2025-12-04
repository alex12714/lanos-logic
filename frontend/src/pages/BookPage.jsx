import React, { useState, useEffect } from 'react';
import { Settings, Calendar, CheckCircle, Users, FileText, TestTube, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

const BookPage = () => {
  const [activeTab, setActiveTab] = useState('business-analysis');
  const [showUATModal, setShowUATModal] = useState(false);
  const [showBPMNModal, setShowBPMNModal] = useState(false);

  useEffect(() => {
    // Load the form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const businessAnalysisBenefits = [
    'Get clarity of the existing processes in place',
    'Minimise the risk of spending money building something you may not need',
    'See clear path for achieving next level',
    'Get a BPMN standard Blueprint process map, that is ready for implementation by any developer',
    'Get a list of User Acceptance Testing production ready elements, which guarantee working software'
  ];

  const discoveryCallBenefits = [
    'Understand your unique business challenges and goals',
    'Explore potential automation opportunities',
    'Get expert recommendations tailored to your needs',
    'Learn about our process and timeline',
    'No commitment required - just valuable insights'
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Book Your </span>
            <span className="text-amber-400">Session</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the session that best fits your needs. Get clarity, minimize risks, and see
            a clear path to achieving your next level of automation.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] to-[#0d0d18]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex rounded-xl overflow-hidden border border-white/10">
            <button
              onClick={() => setActiveTab('business-analysis')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-semibold transition-all duration-300 ${
                activeTab === 'business-analysis'
                  ? 'bg-amber-500 text-black'
                  : 'bg-[#1a1a2e] text-gray-400 hover:text-white hover:bg-[#252540]'
              }`}
            >
              <Settings className="w-5 h-5" />
              Business Analysis
            </button>
            <button
              onClick={() => setActiveTab('discovery-call')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-semibold transition-all duration-300 ${
                activeTab === 'discovery-call'
                  ? 'bg-amber-500 text-black'
                  : 'bg-[#1a1a2e] text-gray-400 hover:text-white hover:bg-[#252540]'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Discovery Call
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d18] via-[#0a0a12] to-[#0a0a12]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Business Analysis Tab */}
          {activeTab === 'business-analysis' && (
            <div className="space-y-12">
              {/* Main Content Card */}
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                  <span className="text-white">Start right with </span>
                  <span className="text-amber-400">Business Analysis</span>
                </h2>
                <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
                  If you are venturing out into new development or looking to re-vamp existing processes - 
                  this session will be a clarity revelation for what you are looking to achieve.
                </p>

                <h3 className="text-amber-400 font-semibold mb-4">What you&apos;ll get:</h3>
                <ul className="space-y-3 mb-8">
                  {businessAnalysisBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <a 
                    href="#ba-booking"
                    className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
                  >
                    Book BA Session now
                    <ArrowRight className="w-5 h-5" />
                    <ArrowRight className="w-5 h-5 -ml-3" />
                    <ArrowRight className="w-5 h-5 -ml-3" />
                  </a>
                </div>
              </div>

              {/* YouTube Video Section */}
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-2">What is Business Analysis?</h3>
                <p className="text-gray-400 mb-6">
                  Watch this educational walkthrough to understand the fundamentals of business analysis 
                  and how it can transform your operations.
                </p>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/9fFQA-JOXA0"
                    title="What Is Business Analytics? | Business: Explained"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Business DNA Section */}
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-2">Your Business DNA</h3>
                <p className="text-gray-400 mb-8">
                  The BPMN diagrams and UAT criteria we create are the business DNA according to which 
                  we will be building your successful automation system. These foundational elements ensure 
                  that every aspect of your automated processes is precisely mapped, thoroughly tested, 
                  and perfectly aligned with your business objectives.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* UAT Card */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-all duration-300">
                    <h4 className="text-lg font-bold text-amber-400 mb-2">
                      User Acceptance Testing (UAT) Criteria
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Our comprehensive UAT checklist ensures every aspect of your automated system 
                      works perfectly before deployment. This detailed criteria covers all business 
                      processes from marketing to payment processing.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowUATModal(true)}
                      className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 rounded-full"
                    >
                      Learn More
                    </Button>
                  </div>

                  {/* BPMN Card */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-all duration-300">
                    <h4 className="text-lg font-bold text-amber-400 mb-2">
                      BPMN Process Mapping
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      See how your business processes will be mapped using industry-standard BPMN 
                      (Business Process Model and Notation) diagrams. This visual representation shows 
                      the complete workflow with all decision points, integrations, and automation touchpoints.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowBPMNModal(true)}
                      className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 rounded-full"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>

              {/* Booking Calendar */}
              <div id="ba-booking" className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">Book Your Business Analysis Session</h3>
                  <p className="text-gray-400 text-sm mt-1">Select a time that works best for you</p>
                </div>
                <div className="bg-white">
                  <iframe 
                    src="https://api.leadconnectorhq.com/widget/booking/EMs6NlYokvHW7xJWUimR" 
                    style={{ width: '100%', minHeight: '650px', border: 'none', overflow: 'hidden' }}
                    scrolling="no" 
                    id="ba-booking-iframe"
                    title="Book Business Analysis Session"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Discovery Call Tab */}
          {activeTab === 'discovery-call' && (
            <div className="space-y-12">
              {/* Main Content Card */}
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                  <span className="text-white">Start with a </span>
                  <span className="text-amber-400">Discovery Call</span>
                </h2>
                <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
                  Not sure where to start? Book a free discovery call to discuss your business needs 
                  and explore how AI automation can help you achieve your goals.
                </p>

                <h3 className="text-amber-400 font-semibold mb-4">What you&apos;ll get:</h3>
                <ul className="space-y-3 mb-8">
                  {discoveryCallBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <a 
                    href="#discovery-booking"
                    className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
                  >
                    Book Discovery Call now
                    <ArrowRight className="w-5 h-5" />
                    <ArrowRight className="w-5 h-5 -ml-3" />
                    <ArrowRight className="w-5 h-5 -ml-3" />
                  </a>
                </div>
              </div>

              {/* Booking Calendar */}
              <div id="discovery-booking" className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white">Book Your Discovery Call</h3>
                  <p className="text-gray-400 text-sm mt-1">Select a time that works best for you</p>
                </div>
                <div className="bg-white">
                  <iframe 
                    src="https://api.leadconnectorhq.com/widget/booking/EMs6NlYokvHW7xJWUimR" 
                    style={{ width: '100%', minHeight: '650px', border: 'none', overflow: 'hidden' }}
                    scrolling="no" 
                    id="discovery-booking-iframe"
                    title="Book Discovery Call"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Feature Cards */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] to-[#0d0d18]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6 text-center hover:border-amber-500/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Expert Consultation</h3>
              <p className="text-gray-400 text-sm">
                Work directly with our automation experts to understand your unique needs
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6 text-center hover:border-amber-500/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">BPMN Blueprint</h3>
              <p className="text-gray-400 text-sm">
                Receive industry-standard process maps ready for implementation
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6 text-center hover:border-amber-500/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                <TestTube className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Testing Framework</h3>
              <p className="text-gray-400 text-sm">
                Get comprehensive testing elements to ensure software quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UAT Modal */}
      <Dialog open={showUATModal} onOpenChange={setShowUATModal}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-amber-400">User Acceptance Testing (UAT) Criteria</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-gray-300">
            <p>
              Our comprehensive UAT checklist is designed to ensure every aspect of your automated 
              system works flawlessly before deployment.
            </p>
            <h4 className="font-semibold text-white">What&apos;s included:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>Functional testing criteria for all business processes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>Integration testing checkpoints for third-party systems</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>Performance benchmarks and acceptance thresholds</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>User journey validation scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>Error handling and edge case documentation</span>
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>

      {/* BPMN Modal */}
      <Dialog open={showBPMNModal} onOpenChange={setShowBPMNModal}>
        <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-amber-400">BPMN Process Mapping</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-gray-300">
            <p>
              Business Process Model and Notation (BPMN) is the global standard for business process 
              modeling, providing a graphical representation that is easily understood by all stakeholders.
            </p>
            <h4 className="font-semibold text-white">Your BPMN diagrams will include:</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>Complete workflow visualization from start to end</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>Decision points and conditional branching</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>System integration touchpoints</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>Data flow and transformation points</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <span>Role assignments and responsibilities</span>
              </li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default BookPage;
