import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiActivity, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AssessmentModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Contact, 2: Selection, 3: Consent
    const [contactData, setContactData] = useState({ name: '', contact: '' });
    const [selectedTest, setSelectedTest] = useState(null);

    const tests = [
        { id: 'cage', name: 'Alcohol Use (CAGE)', route: '/cage', icon: <FiActivity /> },
        { id: 'phq9', name: 'Depression (PHQ-9)', route: '/phq9', icon: <FiAlertCircle /> },
        { id: 'anxiety', name: 'Anxiety (Beck\'s Inventory)', route: '/anxiety', icon: <FiUser /> },
        { id: 'burnout', name: 'Burnout (Maslach\'s Inventory)', route: '/burnout', icon: <FiUser /> },
    ];

    const handleContactSubmit = (e) => {
        e.preventDefault();
        if (contactData.name && contactData.contact) {
            setStep(2);
        }
    };

    const handleTestSelect = (test) => {
        setSelectedTest(test);
        setStep(3);
    };

    const handleConsent = () => {
        // Here you could log the contactData if a backend was available
        console.log("User Contact:", contactData);
        console.log("Selected Test:", selectedTest);

        onClose();
        onClose();
        navigate(selectedTest.route, { state: { contactData } });
        // Reset for next time
        setStep(1);
        setContactData({ name: '', contact: '' });
        setSelectedTest(null);
    };

    const ModalBackdrop = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    };

    const ModalContent = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    };

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
                        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                        variants={ModalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-[var(--primary)] p-4 flex justify-between items-center text-white">
                            <h3 className="font-bold text-lg">Self-Assessment Tool</h3>
                            <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition">
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h4 className="text-xl font-bold mb-2 text-[var(--text-primary)]">Let's get started</h4>
                                    <p className="text-[var(--text-secondary)] mb-6 text-sm">
                                        Please provide your details before taking the assessment. This helps us personalize your experience.
                                    </p>
                                    <form onSubmit={handleContactSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-3 border rounded-lg outline-none focus:border-[var(--primary)] bg-gray-50"
                                                placeholder="Your Name"
                                                value={contactData.name}
                                                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone or Email</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-3 border rounded-lg outline-none focus:border-[var(--primary)] bg-gray-50"
                                                placeholder="e.g 0712... or email@example.com"
                                                value={contactData.contact}
                                                onChange={(e) => setContactData({ ...contactData, contact: e.target.value })}
                                            />
                                        </div>
                                        <button type="submit" className="btn-primary w-full py-3 mt-2 justify-center">
                                            Continue
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h4 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Select an Assessment</h4>
                                    <div className="space-y-3">
                                        {tests.map(test => (
                                            <button
                                                key={test.id}
                                                onClick={() => handleTestSelect(test)}
                                                className="w-full flex items-center p-4 border rounded-xl hover:border-[var(--primary)] hover:bg-blue-50 transition text-left group"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-[var(--primary)] flex items-center justify-center mr-4 group-hover:bg-[var(--primary)] group-hover:text-white transition">
                                                    {test.icon}
                                                </div>
                                                <span className="font-semibold text-gray-700">{test.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="mt-6 text-sm text-[var(--text-secondary)] hover:text-[var(--primary)]"
                                    >
                                        &larr; Back to details
                                    </button>
                                </motion.div>
                            )}

                            {step === 3 && selectedTest && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="text-center mb-6">
                                        <FiAlertCircle className="text-4xl text-yellow-500 mx-auto mb-3" />
                                        <h4 className="text-xl font-bold text-[var(--text-primary)]">Consent Required</h4>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 mb-6 space-y-2 text-left">
                                        <p><strong>Please Note:</strong> This {selectedTest.name} questionnaire is a screening tool for informational purposes only.</p>
                                        <p>It is not a medical diagnosis. Your results are confidential and should be discussed with a professional.</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="flex-1 py-3 border rounded-lg font-semibold hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleConsent}
                                            className="flex-1 py-3 btn-primary justify-center font-bold"
                                        >
                                            I Consent, Start
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Step Indicator */}
                        <div className="flex px-6 pb-6 gap-2 justify-center">
                            {[1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-[var(--primary)]' : 'bg-gray-200'}`}
                                />
                            ))}
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AssessmentModal;
