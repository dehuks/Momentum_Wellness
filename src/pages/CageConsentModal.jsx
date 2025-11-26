import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { Link } from "react-router-dom";


const CageConsentModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          variants={ModalBackdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl relative"
            variants={ModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
                <FiX size={24} />
            </button>
            
            <div className="flex flex-col items-center text-center">
                <FiAlertTriangle className="text-4xl text-yellow-500 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">
                    Consent to Take CAGE Quiz
                </h3>

                {/* FIXED: No markdown asterisks */}
                <p className="text-[var(--text-secondary)] mb-6">
                    The CAGE questionnaire is a <strong>FOUR-QUESTION SCREENING TOOL</strong> for identifying potential alcohol abuse.
                    It is <strong>NOT A DIAGNOSTIC TOOL</strong> and should not replace professional medical advice.
                </p>

                <div className="text-left bg-gray-50 p-4 rounded-lg border mb-6">
                    <p className="font-semibold text-sm mb-2 text-gray-700">By proceeding, you agree to the following:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>You are voluntarily taking this self-assessment.</li>
                        <li>This quiz is for <strong>INFORMATIONAL PURPOSES ONLY</strong>.</li>
                        <li>Your results will be treated with <strong>CONFIDENTIALITY</strong>.</li>
                        <li>You understand that a professional consultation is required for any diagnosis.</li>
                    </ul>
                </div>
                
                <div className="flex gap-4 w-full">
                    <button 
                        onClick={onClose} 
                        className="btn-secondary flex-1 py-3 text-base"
                    >
                        Cancel
                    </button>
                    <Link 
                        to="/cage" 
                        onClick={onClose}
                        className="btn-primary flex-1 py-3 text-base flex items-center justify-center"
                    >
                        I Consent, Start Quiz
                    </Link>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CageConsentModal;
