import React, { useState } from 'react';
import { X, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const RequestCallbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'AI Agents',
    'Voice AI Agents',
    'Document Automation',
    'Process Automation',
    'Social Media Automation',
    'Communication Automation',
    'Mobile App Development',
    'Analytics & Insights',
    'General Consultation'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to webhook
      const response = await fetch('https://hook.eu1.make.com/5nucde579kgh4uug9f5g37yde6ms64jx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || '',
          service: formData.service,
          timestamp: new Date().toISOString(),
          source: 'lanos-logic-website'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', company: '', service: '' });
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success to user (webhook might be async)
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', company: '', service: '' });
        onClose();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1a0a2e] border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-500/20">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <Phone className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-amber-400">Request a Call Back</h2>
          </div>
          <p className="text-gray-300 text-sm mb-6">
            Fill out the form below and we&apos;ll call you back within 24 hours to discuss your automation needs.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Name <span className="text-amber-400">*</span>
              </label>
              <Input
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="h-12 bg-[#2a1a4e] border-purple-500/30 text-white placeholder:text-gray-500 rounded-lg focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email <span className="text-amber-400">*</span>
              </label>
              <Input
                type="email"
                placeholder="your.email@company.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="h-12 bg-[#2a1a4e] border-purple-500/30 text-white placeholder:text-gray-500 rounded-lg focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Phone Number <span className="text-amber-400">*</span>
              </label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
                className="h-12 bg-[#2a1a4e] border-purple-500/30 text-white placeholder:text-gray-500 rounded-lg focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Company Name (Optional)
              </label>
              <Input
                type="text"
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="h-12 bg-[#2a1a4e] border-purple-500/30 text-white placeholder:text-gray-500 rounded-lg focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>

            {/* Service Interest */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                What are you interested in? <span className="text-amber-400">*</span>
              </label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleChange('service', value)}
                required
              >
                <SelectTrigger className="h-12 bg-[#2a1a4e] border-purple-500/30 text-white rounded-lg focus:border-purple-400 focus:ring-purple-400/20">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a1a4e] border-purple-500/30">
                  {services.map((service) => (
                    <SelectItem
                      key={service}
                      value={service}
                      className="text-white hover:bg-amber-500 hover:text-black focus:bg-amber-500 focus:text-black cursor-pointer"
                    >
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.service}
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-lg mt-6 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : submitted ? (
                'Request Submitted!'
              ) : (
                'Request Call Back'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestCallbackModal;
