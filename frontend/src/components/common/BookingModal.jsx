import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import OnFireBooking from './OnFireBooking';

const BookingModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
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
              <h2 className="text-2xl font-bold text-white">Book Your Free Automation Audit</h2>
              <p className="text-gray-400 mt-1">A no-obligation review of your highest-ROI automations — pick a time that works for you</p>
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
            <OnFireBooking />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
