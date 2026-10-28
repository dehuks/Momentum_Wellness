import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiActivity, FiAlertCircle, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const tests = [
    { id: 'cage', name: 'Alcohol Use (CAGE)', route: '/cage', icon: <FiActivity /> },
    { id: 'phq9', name: 'Depression (PHQ-9)', route: '/phq9', icon: <FiAlertCircle /> },
    { id: 'anxiety', name: 'Anxiety (Beck\'s Inventory)', route: '/anxiety', icon: <FiUser /> },
    { id: 'burnout', name: 'Burnout (Maslach\'s Inventory)', route: '/burnout', icon: <FiUser /> },
];

// Anonymous by default: no details are asked for here. People can choose to
// request a call back after seeing their result (see AssessmentFollowUp).
// initialTestId (optional) preselects a test so the user skips the selection step.
const AssessmentModal = ({ isOpen, onClose, initialTestId = null }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Selection, 2: Consent
    const [selectedTest, setSelectedTest] = useState(null);

    // Start each opening fresh, with the requested test (if any) already chosen
    useEffect(() => {
        if (!isOpen) return;
        const preset = tests.find((t) => t.id === initialTestId) || null;
        setSelectedTest(preset);
        setStep(preset ? 2 : 1);
    }, [isOpen, initialTestId]);

    const handleTestSelect = (test) => {
        setSelectedTest(test);
        setStep(2);
    };

    const handleConsent = () => {
        onClose();
        navigate(selectedTest.route);
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
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h4 className="text-xl font-bold mb-1 text-[var(--text-primary)]">Select an Assessment</h4>
                                    <p className="text-sm text-[var(--text-secondary)] mb-4">Free, anonymous and takes a few minutes.</p>
                                    <div className="space-y-3">
                                        {tests.map(test => (
                                            <button
                                                key={test.id}
                                                onClick={() => handleTestSelect(test)}
                                                className="w-full flex items-center p-4 border rounded-xl hover:border-[var(--primary)] hover:bg-teal-50 transition text-left group"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-teal-50 text-[var(--primary)] flex items-center justify-center mr-4 group-hover:bg-[var(--primary)] group-hover:text-white transition">
                                                    {test.icon}
                                                </div>
                                                <span className="font-semibold text-gray-700">{test.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && selectedTest && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="text-center mb-6">
                                        <FiLock className="text-4xl text-[var(--primary)] mx-auto mb-3" />
                                        <h4 className="text-xl font-bold text-[var(--text-primary)]">{selectedTest.name}</h4>
                                    </div>

                                    <div className="bg-[var(--gold-soft)] p-4 rounded-lg border border-[var(--border-color)] text-sm text-[var(--text-primary)] mb-6 space-y-2 text-left">
                                        <p><strong>Private and anonymous.</strong> We don't ask who you are, and your answers stay on this device. Nothing is sent to us unless you choose to request a call back at the end.</p>
                                        <p>This is a screening tool for information only, not a medical diagnosis. We encourage you to discuss your result with a professional.</p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="flex-1 py-3 border rounded-lg font-semibold hover:bg-gray-50 transition"
                                        >
                                            Choose another
                                        </button>
                                        <button
                                            onClick={handleConsent}
                                            className="flex-1 py-3 btn-primary justify-center font-bold"
                                        >
                                            I Understand, Start
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Step Indicator */}
                        <div className="flex px-6 pb-6 gap-2 justify-center">
                            {[1, 2].map(i => (
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
