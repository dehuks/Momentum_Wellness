// AppointmentModal.jsx (Updated)
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiX, FiArrowLeft } from 'react-icons/fi';
import { WhatsAppButton } from './pages/WhatsappConfig'; // Assuming this component exists
import ModalContactForm from './components/ModalContactForm'; 


const ModalBackdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const ModalContent = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { 
    y: "0", 
    opacity: 1, 
    transition: { delay: 0.1, type: "spring", stiffness: 100 } 
  },
};

const AppointmentModal = ({ isOpen, onClose }) => {
  // ➡️ New state to control the modal's view: 'choice' or 'form'
  const [view, setView] = useState('choice'); 

  // Reset view when closing the modal
  const handleClose = () => {
    setView('choice');
    onClose();
  }

  // Use AnimatePresence for content transitions inside the modal
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          variants={ModalBackdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleClose} 
        >
          <motion.div
            className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl relative"
            variants={ModalContent}
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
                onClick={handleClose} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10"
            >
                <FiX size={24} />
            </button>
            
            {/* ➡️ Back Button for Form View */}
            {view === 'form' && (
                <button 
                    onClick={() => setView('choice')} 
                    className="absolute top-4 left-4 text-gray-600 hover:text-[var(--primary)] transition-colors flex items-center gap-1 z-10 text-sm font-medium"
                >
                    <FiArrowLeft size={18} />
                    Back
                </button>
            )}

            <AnimatePresence mode="wait">
                {view === 'choice' && (
                    <motion.div 
                        key="choice"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-xl font-bold text-center mb-6 text-[var(--text-primary)]">
                            Choose Your Booking Method
                        </h3>

                        <div className="space-y-4">
                            {/* Option 1: WhatsApp */}
                            <WhatsAppButton 
                                className="btn-primary w-full py-3 text-base"
                                message="Hello! I'm interested in booking an appointment with MOWET Kenya."
                                onClick={handleClose} // Close modal after selection
                            >
                                Book via WhatsApp
                            </WhatsAppButton>

                            <p className="text-center text-sm text-[var(--text-secondary)]">OR</p>
                            
                            {/* ➡️ Option 2: Switch to Form View */}
                            <button
                                onClick={() => setView('form')}
                                className="btn-secondary w-full py-3 text-base flex items-center justify-center gap-2"
                            >
                                <FiMail className="w-5 h-5" />
                                Send an Email Inquiry
                            </button>
                        </div>
                    </motion.div>
                )}

                {view === 'form' && (
                    <motion.div 
                        key="form"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* ➡️ Render the EmailJS form component */}
                        <ModalContactForm 
                            onClose={handleClose}
                            title="Appointment Request (In-Modal)"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;