import React, { useState } from 'react';
import { Send, Mail, User, Building2, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { services } from '../../data/mock';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send data to webhook
      await fetch('https://hook.eu1.make.com/5nucde579kgh4uug9f5g37yde6ms64jx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact_form',
          name: formData.name,
          email: formData.email,
          company: formData.company || '',
          service: formData.service || '',
          message: formData.message,
          timestamp: new Date().toISOString(),
          source: 'lanos-logic-website-homepage'
        }),
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', company: '', service: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-400 text-lg">
            Have questions about our AI solutions? Fill out the form below and
            our team will get back to you shortly.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-8">
            <div className="space-y-5">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20"
                />
              </div>

              {/* Company */}
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20"
                />
              </div>

              {/* Service */}
              <Select
                value={formData.service}
                onValueChange={(value) => handleChange('service', value)}
              >
                <SelectTrigger className="h-14 bg-white/5 border-white/10 text-white rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a2e] border-white/10">
                  {services.map((service) => (
                    <SelectItem
                      key={service.id}
                      value={service.id}
                      className="text-white hover:bg-white/10 focus:bg-white/10"
                    >
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Message */}
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  rows={5}
                  className="pl-12 pt-4 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-amber-500/50 focus:ring-amber-500/20 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-xl gap-2 shadow-lg shadow-amber-500/25 transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                'Sending...'
              ) : submitted ? (
                'Message Sent!'
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;
