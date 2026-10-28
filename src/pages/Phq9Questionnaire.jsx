import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AssessmentFollowUp from '../components/AssessmentFollowUp';

const Phq9Questionnaire = () => {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const topRef = useRef(null);

    // Scroll after the result (or reset form) has rendered: scrolling inside the click
    // handler ran before the page shrank, and phones cancelled the half-finished scroll.
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [result]);

    const questions = [
        { id: 1, text: "Little interest or pleasure in doing things" },
        { id: 2, text: "Feeling down, depressed, or hopeless" },
        { id: 3, text: "Trouble falling or staying asleep, or sleeping too much" },
        { id: 4, text: "Feeling tired or having little energy" },
        { id: 5, text: "Poor appetite or overeating" },
        { id: 6, text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
        { id: 7, text: "Trouble concentrating on things, such as reading the newspaper or watching television" },
        { id: 8, text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual" },
        { id: 9, text: "Thoughts that you would be better off dead or of hurting yourself in some way" }
    ];

    const options = [
        { value: 0, label: "Not at all" },
        { value: 1, label: "Several days" },
        { value: 2, label: "More than half the days" },
        { value: 3, label: "Nearly every day" }
    ];

    const handleOptionSelect = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const calculateScore = () => {
        let score = 0;
        Object.values(answers).forEach(val => score += val);

        let interpretation = "";
        let colorClass = "";

        if (score <= 4) {
            interpretation = "Minimal Depression";
            colorClass = "text-green-600";
        } else if (score <= 9) {
            interpretation = "Mild Depression";
            colorClass = "text-yellow-600";
        } else if (score <= 14) {
            interpretation = "Moderate Depression";
            colorClass = "text-orange-500";
        } else if (score <= 19) {
            interpretation = "Moderately Severe Depression";
            colorClass = "text-orange-700";
        } else {
            interpretation = "Severe Depression";
            colorClass = "text-red-600";
        }

        // Question 9 asks about thoughts of self-harm; any answer above "Not at all" needs urgent signposting
        setResult({ score, interpretation, colorClass, selfHarmRisk: answers[9] > 0 });
    };

    const resetTest = () => {
        setAnswers({});
        setResult(null);
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
                        <h1 className="text-2xl font-bold mb-2">Patient Health Questionnaire (PHQ-9)</h1>
                        <p className="opacity-90 max-w-xl mx-auto text-sm">
                            Over the last 2 weeks, how often have you been bothered by any of the following problems?
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

                                <div className="mb-8">
                                    <AssessmentFollowUp
                                        testName="Depression (PHQ-9)"
                                        emailTitle="PHQ-9 Assessment"
                                        scoreData={result.score}
                                        interpretation={result.interpretation}
                                        concerning={result.score >= 10}
                                        urgent={result.selfHarmRisk}
                                    />
                                </div>

                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-left text-sm text-blue-900 mx-auto max-w-2xl">
                                    <div className="flex items-start">
                                        <FiAlertTriangle className="shrink-0 mt-0.5 mr-3" />
                                        <div>
                                            <p className="font-bold mb-1">Disclaimer</p>
                                            <p>This self-assessment is for informational purposes only and is not a medical diagnosis. If you are experiencing distress, please consult a healthcare professional. If you have thoughts of self-harm, please seek immediate help.</p>
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

export default Phq9Questionnaire;
