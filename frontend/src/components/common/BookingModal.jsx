import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

const BookingModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Load the form embed script
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.style.overflow = 'unset';
        // Clean up script if needed
        const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/10 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold text-white">Book Your Free Discovery Call</h2>
              <p className="text-gray-400 mt-1">Schedule a time that works best for you</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          
          {/* Calendar Embed */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="bg-white rounded-xl overflow-hidden">
              <iframe 
                src="https://api.leadconnectorhq.com/widget/booking/EMs6NlYokvHW7xJWUimR" 
                style={{ width: '100%', minHeight: '600px', border: 'none', overflow: 'hidden' }}
                scrolling="no" 
                id="EMs6NlYokvHW7xJWUimR_1764857900173"
                title="Book a Call"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
