import React, { createContext, useContext, useState } from 'react';
import BookingModal from '../components/common/BookingModal';
import RequestCallbackModal from '../components/common/RequestCallbackModal';
import BuildWizardModal from '../components/common/BuildWizardModal';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [isBuildWizardOpen, setIsBuildWizardOpen] = useState(false);

  const openBookingModal = () => setIsModalOpen(true);
  const closeBookingModal = () => setIsModalOpen(false);
  
  const openCallbackModal = () => setIsCallbackModalOpen(true);
  const closeCallbackModal = () => setIsCallbackModalOpen(false);

  const openBuildWizard = () => setIsBuildWizardOpen(true);
  const closeBuildWizard = () => setIsBuildWizardOpen(false);

  return (
    <BookingContext.Provider value={{ 
      openBookingModal, 
      closeBookingModal, 
      isModalOpen,
      openCallbackModal,
      closeCallbackModal,
      isCallbackModalOpen,
      openBuildWizard,
      closeBuildWizard,
      isBuildWizardOpen
    }}>
      {children}
      <BookingModal isOpen={isModalOpen} onClose={closeBookingModal} />
      <RequestCallbackModal isOpen={isCallbackModalOpen} onClose={closeCallbackModal} />
      <BuildWizardModal isOpen={isBuildWizardOpen} onClose={closeBuildWizard} />
    </BookingContext.Provider>
  );
};
