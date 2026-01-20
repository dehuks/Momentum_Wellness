import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { sendEmail, formatAssessmentResult } from '../utils/emailService';

const BurnoutQuestionnaire = () => {
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
        // Emotional Exhaustion (EE) - 9 items
        { id: 1, text: "I feel emotionally exhausted because of my work.", category: 'EE' },
        { id: 2, text: "I feel worn out at the end of a working day.", category: 'EE' },
        { id: 3, text: "I feel tired as soon as I get up in the morning and see a new working day stretched out in front of me.", category: 'EE' },
        { id: 4, text: "Working with people the whole day is stressful for me.", category: 'EE' },
        { id: 5, text: "I feel burned out because of my work.", category: 'EE' },
        { id: 6, text: "I feel frustrated by my work.", category: 'EE' },
        { id: 7, text: "I get the feeling that I work too hard.", category: 'EE' },
        { id: 8, text: "Being in direct contact with people at work is too stressful.", category: 'EE' },
        { id: 9, text: "I feel as if I'm at my wits' end.", category: 'EE' },

        // Depersonalization (DP) - 5 items
        { id: 10, text: "I get the feeling that I treat some clients/colleagues impersonally, as if they were objects.", category: 'DP' },
        { id: 11, text: "I have become more callous to people since I have started doing this job.", category: 'DP' },
        { id: 12, text: "I'm afraid that my work makes me emotionally harder.", category: 'DP' },
        { id: 13, text: "I'm not really interested in what is going on with many of my colleagues.", category: 'DP' },
        { id: 14, text: "I have the feeling that my colleagues blame me for some of their problems.", category: 'DP' },

        // Personal Accomplishment (PA) - 8 items
        { id: 15, text: "I can easily understand the actions of my colleagues/supervisors.", category: 'PA' },
        { id: 16, text: "I deal with other people's problems successfully.", category: 'PA' },
        { id: 17, text: "I feel that I influence other people positively through my work.", category: 'PA' },
        { id: 18, text: "I feel full of energy.", category: 'PA' },
        { id: 19, text: "I find it easy to build a relaxed atmosphere in my working environment.", category: 'PA' },
        { id: 20, text: "I feel stimulated when I've been working closely with my colleagues.", category: 'PA' },
        { id: 21, text: "I have achieved many rewarding objectives in my work.", category: 'PA' },
        { id: 22, text: "In my work I am very relaxed when dealing with emotional problems.", category: 'PA' }
    ];

    const options = [
        { value: 0, label: "Never" },
        { value: 1, label: "A few times a year or less" },
        { value: 2, label: "Once a month or less" },
        { value: 3, label: "A few times a month" },
        { value: 4, label: "Once a week" },
        { value: 5, label: "A few times a week" },
        { value: 6, label: "Every day" }
    ];

    const handleOptionSelect = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const calculateScore = async () => {
        let eeScore = 0;
        let dpScore = 0;
        let paScore = 0;

        questions.forEach(q => {
            const val = answers[q.id] || 0;
            if (q.category === 'EE') eeScore += val;
            if (q.category === 'DP') dpScore += val;
            if (q.category === 'PA') paScore += val;
        });

        let interpretation = [];
        let colorClass = "text-yellow-600"; // Default

        if (eeScore >= 27 || dpScore >= 10) {
            colorClass = "text-red-600";
            interpretation.push("High risk of burnout detected.");
        } else if (eeScore >= 17 || dpScore >= 4) {
            interpretation.push("Moderate risk of burnout.");
        } else {
            colorClass = "text-green-600";
            interpretation.push("Low risk of burnout.");
        }

        if (paScore < 34) {
            interpretation.push("You may not be feeling a strong sense of personal accomplishment.");
        }

        const interpretationText = interpretation.join(" ");

        setResult({
            scores: { ee: eeScore, dp: dpScore, pa: paScore },
            interpretation: interpretationText,
            colorClass
        });

        // Send email if contact data exists
        if (contactData) {
            setEmailStatus('sending');
            const message = formatAssessmentResult(
                "Maslach's Burnout Inventory",
                { "Emotional Exhaustion": eeScore, "Depersonalization": dpScore, "Personal Accomplishment": paScore },
                interpretationText
            );

            try {
                await sendEmail({
                    name: contactData.name,
                    email: contactData.contact.includes('@') ? contactData.contact : 'Not provided',
                    phone: contactData.contact,
                    message: message,
                    title: "Burnout Assessment Result"
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
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center text-[var(--primary)] font-medium mb-6 hover:underline">
                    <FiArrowLeft className="mr-2" /> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="bg-[var(--primary)] p-6 text-white text-center">
                        <h1 className="text-2xl font-bold mb-2">Maslach Burnout Inventory (MBI)</h1>
                        <p className="opacity-90 max-w-xl mx-auto text-sm">
                            Please read each statement carefully and decide if you ever feel this way about your job. If you have never had this feeling, select "Never". If you have had this feeling, indicate how often you feel it.
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
                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                                            {options.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => handleOptionSelect(q.id, opt.value)}
                                                    className={`p-2 rounded-lg border text-xs font-medium transition-all flex flex-col items-center justify-center h-full ${answers[q.id] === opt.value
                                                            ? 'bg-blue-50 border-[var(--primary)] text-[var(--primary)] ring-2 ring-blue-100'
                                                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <span className="font-bold text-lg mb-1">{opt.value}</span>
                                                    <span className="text-center leading-tight">{opt.label}</span>
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

                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Assessment Complete</h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                        <p className="text-xs uppercase font-bold text-orange-400 mb-1">Emotional Exhaustion</p>
                                        <p className="text-3xl font-bold text-orange-700">{result.scores.ee}</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                        <p className="text-xs uppercase font-bold text-purple-400 mb-1">Depersonalization</p>
                                        <p className="text-3xl font-bold text-purple-700">{result.scores.dp}</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <p className="text-xs uppercase font-bold text-green-400 mb-1">Personal Accomplishment</p>
                                        <p className="text-3xl font-bold text-green-700">{result.scores.pa}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto mb-8 border border-gray-100">
                                    <p className={`text-lg font-medium ${result.colorClass}`}>
                                        {result.interpretation}
                                    </p>
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
                                            <p>This self-assessment is for informational purposes only and is not a medical diagnosis. Burnout is complex and professional guidance is recommended for interpretation and support.</p>
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

export default BurnoutQuestionnaire;
