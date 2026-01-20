import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { sendEmail, formatAssessmentResult } from '../utils/emailService';

const AnxietyQuestionnaire = () => {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [emailStatus, setEmailStatus] = useState(null); // 'sending', 'sent', 'error'
    const topRef = useRef(null);
    const location = useLocation();
    const contactData = location.state?.contactData;

    useEffect(() => {
        // Scroll to top on mount
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const questions = [
        { id: 1, text: "Numbness or tingling" },
        { id: 2, text: "Feeling hot" },
        { id: 3, text: "Wobbliness in legs" },
        { id: 4, text: "Unable to relax" },
        { id: 5, text: "Fear of worst happening" },
        { id: 6, text: "Dizzy or lightheaded" },
        { id: 7, text: "Heart pounding/racing" },
        { id: 8, text: "Unsteady" },
        { id: 9, text: "Terrified or afraid" },
        { id: 10, text: "Nervous" },
        { id: 11, text: "Feeling of choking" },
        { id: 12, text: "Hands trembling" },
        { id: 13, text: "Shaky / unsteady" },
        { id: 14, text: "Fear of losing control" },
        { id: 15, text: "Difficulty in breathing" },
        { id: 16, text: "Fear of dying" },
        { id: 17, text: "Scared" },
        { id: 18, text: "Indigestion" },
        { id: 19, text: "Faint / lightheaded" },
        { id: 20, text: "Face flushed" },
        { id: 21, text: "Hot/cold sweats" }
    ];

    const options = [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Mildly (didn't bother me much)" },
        { value: 2, label: "Moderately (wasn't pleasant at times)" },
        { value: 3, label: "Severely (bothered me a lot)" }
    ];

    const handleOptionSelect = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const calculateScore = async () => {
        let score = 0;
        Object.values(answers).forEach(val => score += val);

        let interpretation = "";
        let colorClass = "";

        if (score <= 21) {
            interpretation = "Low Anxiety";
            colorClass = "text-green-600";
        } else if (score <= 35) {
            interpretation = "Moderate Anxiety";
            colorClass = "text-yellow-600";
        } else {
            interpretation = "Potentially Concerning Anxiety";
            colorClass = "text-red-600";
        }

        setResult({ score, interpretation, colorClass });

        // Send email if contact data exists
        if (contactData) {
            setEmailStatus('sending');
            const message = formatAssessmentResult("Beck's Anxiety Inventory", score, interpretation);

            try {
                await sendEmail({
                    name: contactData.name,
                    email: contactData.contact.includes('@') ? contactData.contact : 'Not provided',
                    phone: contactData.contact,
                    message: message,
                    title: "Anxiety Assessment Result"
                });
                setEmailStatus('sent');
            } catch (error) {
                console.error("Failed to send email", error);
                setEmailStatus('error');
            }
        }

        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const resetTest = () => {
        setAnswers({});
        setResult(null);
        setEmailStatus(null);
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const isComplete = questions.every(q => answers[q.id] !== undefined);

    return (
        <div className="min-h-screen bg-[var(--light-bg)] py-12 px-4" ref={topRef}>
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="inline-flex items-center text-[var(--primary)] font-medium mb-6 hover:underline">
                    <FiArrowLeft className="mr-2" /> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="bg-[var(--primary)] p-6 text-white text-center">
                        <h1 className="text-2xl font-bold mb-2">Beck's Anxiety Inventory (BAI)</h1>
                        <p className="opacity-90 max-w-xl mx-auto text-sm">
                            Below is a list of common symptoms of anxiety. Please read each item carefully and indicate how much you have been bothered by that symptom during the past week, including today.
                        </p>
                    </div>

                    <div className="p-6 md:p-8">
                        {!result ? (
                            <div className="space-y-8">
                                {questions.map((q, index) => (
                                    <div key={q.id} className="border-b border-gray-100 pb-6 last:border-0">
                                        <p className="font-medium text-gray-800 mb-4 text-lg">
                                            <span className="text-gray-400 mr-2">{index + 1}.</span>
                                            {q.text}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                            {options.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => handleOptionSelect(q.id, opt.value)}
                                                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${answers[q.id] === opt.value
                                                            ? 'bg-blue-50 border-[var(--primary)] text-[var(--primary)] ring-2 ring-blue-100'
                                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-6">
                                    <button
                                        onClick={calculateScore}
                                        disabled={!isComplete}
                                        className={`w-full py-4 text-lg font-bold rounded-xl transition-all shadow-lg ${isComplete
                                                ? 'bg-[var(--primary)] text-white hover:bg-blue-700 hover:shadow-xl'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {isComplete ? 'Calculate Results' : 'Please Answer All Questions'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-8"
                            >
                                <div className="mb-6 inline-flex justify-center items-center w-20 h-20 rounded-full bg-blue-50 text-[var(--primary)]">
                                    <FiCheckCircle size={40} />
                                </div>

                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete</h2>
                                <div className="bg-gray-50 rounded-xl p-6. max-w-md mx-auto my-8 border border-gray-100">
                                    <p className="text-gray-500 mb-1 uppercase tracking-wider text-xs font-bold">Your Total Score</p>
                                    <p className={`text-5xl font-extrabold mb-4 ${result.colorClass}`}>{result.score}</p>
                                    <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold bg-white border shadow-sm ${result.colorClass}`}>
                                        {result.interpretation}
                                    </div>
                                </div>

                                {emailStatus === 'sending' && (
                                    <p className="text-blue-500 mb-4 animate-pulse">Sending results...</p>
                                )}
                                {emailStatus === 'sent' && (
                                    <p className="text-green-600 mb-4 font-bold">Results sent successfully!</p>
                                )}
                                {emailStatus === 'error' && (
                                    <p className="text-red-500 mb-4">Could not send results automatically.</p>
                                )}

                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-left text-sm text-blue-900 mx-auto max-w-2xl">
                                    <div className="flex items-start">
                                        <FiAlertTriangle className="shrink-0 mt-0.5 mr-3" />
                                        <div>
                                            <p className="font-bold mb-1">Disclaimer</p>
                                            <p>This self-assessment is for informational purposes only and is not a medical diagnosis. If you are experiencing distress, please consult a healthcare professional.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={resetTest}
                                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                                    >
                                        <FiRefreshCw className="mr-2" /> Retake Test
                                    </button>
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                                    >
                                        Book a Professional Consultation
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AnxietyQuestionnaire;
