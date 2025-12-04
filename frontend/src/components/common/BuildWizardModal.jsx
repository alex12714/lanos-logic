import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Bot, Phone, FileText, Workflow, Share2, MessageSquare, Smartphone, BarChart3, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const solutionOptions = [
  {
    id: 'ai-agents',
    name: 'AI Agents',
    description: 'Intelligent virtual assistants for customer interactions',
    icon: Bot
  },
  {
    id: 'voice-ai',
    name: 'Voice AI Agents',
    description: 'Natural-sounding voice assistants for calls & support',
    icon: Phone
  },
  {
    id: 'document-automation',
    name: 'Document Automation',
    description: 'Intelligent document processing & management',
    icon: FileText
  },
  {
    id: 'process-automation',
    name: 'Process Automation',
    description: 'End-to-end business process automation',
    icon: Workflow
  },
  {
    id: 'social-media',
    name: 'Social Media Automation',
    description: 'AI-powered content & engagement management',
    icon: Share2
  },
  {
    id: 'communication',
    name: 'Communication Automation',
    description: 'SMS, voice & messaging solutions',
    icon: MessageSquare
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Development',
    description: 'Custom Flutter applications',
    icon: Smartphone
  },
  {
    id: 'analytics',
    name: 'Analytics & Insights',
    description: 'Data-driven insights & performance tracking',
    icon: BarChart3
  }
];

const BuildWizardModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [projectDetails, setProjectDetails] = useState({
    description: '',
    timeline: '',
    budget: ''
  });
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Load the form embed script for calendar
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    } else {
      document.body.style.overflow = 'unset';
      // Reset state when closed
      setStep(1);
      setSelectedSolution(null);
      setProjectDetails({ description: '', timeline: '', budget: '' });
      setContactDetails({ name: '', email: '', phone: '', company: '' });
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNext = async () => {
    if (step === 4) {
      // Submit to webhook before showing calendar
      setIsSubmitting(true);
      try {
        await fetch('https://hook.eu1.make.com/5nucde579kgh4uug9f5g37yde6ms64jx', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'build_wizard',
            solution: selectedSolution?.name,
            solutionId: selectedSolution?.id,
            projectDescription: projectDetails.description,
            timeline: projectDetails.timeline,
            budget: projectDetails.budget,
            name: contactDetails.name,
            email: contactDetails.email,
            phone: contactDetails.phone,
            company: contactDetails.company,
            timestamp: new Date().toISOString(),
            source: 'lanos-logic-website-wizard'
          }),
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
      setIsSubmitting(false);
      setStep(5);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return selectedSolution !== null;
      case 3:
        return projectDetails.description.trim() !== '';
      case 4:
        return contactDetails.name && contactDetails.email && contactDetails.phone;
      default:
        return true;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {step === 1 && "Let's Build Something Amazing"}
                {step === 2 && "Choose Your Solution"}
                {step === 3 && "Tell Us About Your Project"}
                {step === 4 && "Your Contact Details"}
                {step === 5 && "Book Your Discovery Call"}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Step {Math.min(step, 5)} of 5
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-amber-500' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Step 1: Introduction */}
            {step === 1 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                  <Bot className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  What do you want to build?
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  We&apos;ll help you find the perfect AI automation solution for your business. 
                  Let&apos;s start by understanding your needs.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Save Time', 'Reduce Costs', 'Scale Operations', 'Improve CX'].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Choose Solution */}
            {step === 2 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {solutionOptions.map((solution) => {
                  const IconComponent = solution.icon;
                  const isSelected = selectedSolution?.id === solution.id;
                  return (
                    <button
                      key={solution.id}
                      onClick={() => setSelectedSolution(solution)}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/50'
                          : 'bg-white/5 border-white/10 hover:border-amber-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-amber-500/30' : 'bg-white/10'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-semibold ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                              {solution.name}
                            </h4>
                            {isSelected && (
                              <CheckCircle className="w-5 h-5 text-amber-400" />
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{solution.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 3: Project Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Describe your project <span className="text-amber-400">*</span>
                  </label>
                  <Textarea
                    placeholder="Tell us about what you want to achieve, your current challenges, and any specific requirements..."
                    value={projectDetails.description}
                    onChange={(e) => setProjectDetails(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Preferred timeline
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['ASAP', '1-3 months', '3-6 months'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setProjectDetails(prev => ({ ...prev, timeline: time }))}
                        className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                          projectDetails.timeline === time
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-amber-500/30'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Budget range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['< $5k', '$5k-$15k', '$15k-$50k', '$50k+'].map((budget) => (
                      <button
                        key={budget}
                        onClick={() => setProjectDetails(prev => ({ ...prev, budget: budget }))}
                        className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                          projectDetails.budget === budget
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-amber-500/30'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact Details */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Full Name <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={contactDetails.name}
                    onChange={(e) => setContactDetails(prev => ({ ...prev, name: e.target.value }))}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@company.com"
                    value={contactDetails.email}
                    onChange={(e) => setContactDetails(prev => ({ ...prev, email: e.target.value }))}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={contactDetails.phone}
                    onChange={(e) => setContactDetails(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your company name (optional)"
                    value={contactDetails.company}
                    onChange={(e) => setContactDetails(prev => ({ ...prev, company: e.target.value }))}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-500/50"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Book Calendar */}
            {step === 5 && (
              <div>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Details Submitted!</h3>
                  <p className="text-gray-400 text-sm">
                    Now let&apos;s schedule your discovery call to discuss your {selectedSolution?.name} project.
                  </p>
                </div>
                <div className="bg-white rounded-xl overflow-hidden">
                  <iframe 
                    src="https://api.leadconnectorhq.com/widget/booking/EMs6NlYokvHW7xJWUimR" 
                    style={{ width: '100%', minHeight: '500px', border: 'none', overflow: 'hidden' }}
                    scrolling="no" 
                    id="wizard-booking-iframe"
                    title="Book Discovery Call"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {step < 5 && (
            <div className="flex items-center justify-between p-6 border-t border-white/10">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-white/20 text-white hover:bg-white/5 rounded-full px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-full px-6 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : step === 4 ? 'Submit & Book Call' : 'Continue'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildWizardModal;
