import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, User, Building2, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import OnFireBooking from '../components/common/OnFireBooking';
import Layout from '../components/layout/Layout';
import Seo from '../components/seo/Seo';
import FaqSection from '../components/common/FaqSection';
import { ORG, breadcrumb } from '../lib/seo';
import { Button } from '../components/ui/button';
import { contactFaqs } from '../data/faqData';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { services } from '../data/mock';

const ContactPage = () => {
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
          source: 'lanos-logic-website-contact'
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

  const [infoTab, setInfoTab] = useState('contact');
  const infoTabs = [
    { id: 'contact', label: 'Contact' },
    { id: 'office', label: 'Office & hours' },
    { id: 'faq', label: 'FAQ' },
  ];
  const contactChannels = [
    { icon: Mail, title: 'Email Us', content: 'hello@lanos-logic.com', description: 'Send us an email anytime', href: 'mailto:hello@lanos-logic.com' },
    { icon: Phone, title: 'Call Us (US)', content: '+1 (518) 864 3528', description: 'Mon-Fri, 9am-6pm CST', href: 'tel:+15188643528' },
    { icon: Phone, title: 'Call Us (UK)', content: '+44 1313 813160', description: 'Mon-Fri, 9am-6pm GMT', href: 'tel:+441313813160' },
  ];

  return (
    <Layout>
      <Seo
        title="Contact Lanos Logic — Book a Free AI Automation Consultation"
        description="Get in touch with Lanos Logic to discuss AI automation for your business. Book a free consultation and get a custom solution recommendation."
        path="/contact"
        jsonLd={[
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Lanos Logic',
            url: 'https://lanos-logic.com/contact',
            mainEntity: {
              ...ORG,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-518-864-3528',
                email: 'hello@lanos-logic.com',
                contactType: 'sales',
              },
            },
          },
        ]}
      />
      {/* Hero */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5">
            Get in <span className="text-amber-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Book a free discovery call below, or send us a message and we will get back to you shortly.
          </p>
        </div>
      </section>

      {/* 1. Schedule a call */}
      <section id="schedule" className="relative pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a12]" />
        {/* max-w-5xl keeps the booking frame wider than 860px on desktop, which is
            where the OnFire embed switches to its side-by-side layout
            (details left, calendar right). Phones get the stacked layout. */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <h2 className="text-xl font-bold text-white">Schedule a Call</h2>
              </div>
              <a href="#message" className="text-sm text-amber-400 hover:text-amber-300 whitespace-nowrap">
                Prefer to write? Send a message
              </a>
            </div>
            <OnFireBooking />
          </div>
        </div>
      </section>

      {/* 2. Send us a message */}
      <section id="message" className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0d0d18] to-[#0a0a12]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
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
                        <SelectValue placeholder="Interested In" />
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

      {/* 3. Information in tabs */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] to-[#050508]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">More Ways to Reach Us</h2>
          <div role="tablist" aria-label="Contact information" className="flex gap-1 p-1 rounded-full bg-white/5 border border-white/10 w-full sm:w-fit overflow-x-auto">
            {infoTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={infoTab === t.id}
                aria-controls={`panel-${t.id}`}
                onClick={() => setInfoTab(t.id)}
                className={`flex-1 sm:flex-none whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  infoTab === t.id ? 'bg-amber-500 text-black' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {/* Contact */}
            <div role="tabpanel" id="panel-contact" aria-labelledby="tab-contact" hidden={infoTab !== 'contact'}>
              <div className="grid sm:grid-cols-3 gap-4">
                {contactChannels.map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    className="group bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                      <c.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <p className="text-white font-semibold">{c.title}</p>
                    <p className="text-amber-400 font-medium mt-0.5 break-words">{c.content}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{c.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Office & hours */}
            <div role="tabpanel" id="panel-office" aria-labelledby="tab-office" hidden={infoTab !== 'office'}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-white font-semibold">Office</p>
                  <p className="text-amber-400 font-medium mt-0.5">24 E Washington St Suite 875</p>
                  <p className="text-gray-500 text-sm mt-0.5">Chicago, IL 60602</p>
                </div>
                <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-white font-semibold">Business Hours</p>
                  <p className="text-amber-400 font-medium mt-0.5">9:00 AM - 6:00 PM</p>
                  <p className="text-gray-500 text-sm mt-0.5">Monday to Friday (CST). UK line 9am-6pm GMT.</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div role="tabpanel" id="panel-faq" aria-labelledby="tab-faq" hidden={infoTab !== 'faq'}>
              <FaqSection faqs={contactFaqs} embedded />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
