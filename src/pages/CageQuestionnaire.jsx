import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiArrowLeft, FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { sendEmail, formatAssessmentResult } from '../utils/emailService';

const questions = [
  { id: 1, text: "Have you ever felt you should Cut down on your drinking?" },
  { id: 2, text: "Have people Annoyed you by criticizing your drinking?" },
  { id: 3, text: "Have you ever felt Guilty about drinking?" },
  {
    id: 4,
    text: "Have you ever had a drink first thing in the morning (Eye-opener) to steady your nerves or get rid of a hangover?",
  },
];

const CageQuestionnaire = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

  const topRef = useRef(null);
  const location = useLocation();
  const contactData = location.state?.contactData;

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const score = Object.values(answers).filter((ans) => ans === "yes").length;
    const interpretation = score >= 2 ? "High Risk (Potential alcohol concerns)" : "Low Risk";

    // Send email if contact data exists
    if (contactData) {
      setEmailStatus('sending');
      const message = formatAssessmentResult("Alcohol Use (CAGE)", score, interpretation);

      try {
        await sendEmail({
          name: contactData.name,
          email: contactData.contact.includes('@') ? contactData.contact : 'Not provided',
          phone: contactData.contact,
          message: message,
          title: "CAGE Assessment Result"
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
    setSubmitted(false);
    setEmailStatus(null);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--light-bg)] py-12 px-4" ref={topRef}>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center text-[var(--primary)] font-medium mb-6 hover:underline">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>

        <div className="flex flex-col w-full h-full">
          <motion.h1
            className="text-3xl font-bold text-center mb-6 text-[var(--text-primary)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            CAGE Questionnaire
          </motion.h1>

          {/* Scrollable container */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {!submitted ? (
              <>
                {questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="bg-[var(--card-bg)] text-[var(--text-primary)] rounded-2xl shadow-md p-6 border border-[var(--border-color)]">
                      <p className="text-lg font-medium mb-4">{q.text}</p>
                      <div className="flex gap-4">
                        <button
                          className={`px-4 py-2 rounded-lg transition ${answers[q.id] === "yes"
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--light-bg)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                            }`}
                          onClick={() => handleAnswer(q.id, "yes")}
                        >
                          Yes
                        </button>
                        <button
                          className={`px-4 py-2 rounded-lg transition ${answers[q.id] === "no"
                              ? "bg-[var(--primary)] text-white"
                              : "bg-[var(--light-bg)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
                            }`}
                          onClick={() => handleAnswer(q.id, "no")}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Sticky submit button */}
                <div className="sticky bottom-0 bg-[var(--light-bg)] pt-4 pb-2 flex justify-center">
                  <button
                    className="px-8 py-3 rounded-lg text-lg font-semibold text-white shadow-lg transition disabled:opacity-50"
                    style={{ background: "var(--gradient-primary)" }}
                    disabled={Object.keys(answers).length < questions.length}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </>
            ) : (
              <motion.div
                className="p-10 rounded-2xl shadow-xl text-center text-white"
                style={{ background: "var(--gradient-primary)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {Object.values(answers).filter((ans) => ans === "yes").length >= 2 ? (
                  <div>
                    <FiXCircle className="w-16 h-16 mx-auto mb-4 text-red-200" />
                    <h2 className="text-2xl font-bold mb-2">High Risk</h2>
                    <p>
                      Your score suggests potential alcohol-related concerns. We
                      recommend seeking professional support.
                    </p>
                  </div>
                ) : (
                  <div>
                    <FiCheckCircle className="w-16 h-16 mx-auto mb-4 text-green-200" />
                    <h2 className="text-2xl font-bold mb-2">Low Risk</h2>
                    <p>
                      Your answers suggest low risk. Continue practicing healthy
                      habits and seek help if needed.
                    </p>
                  </div>
                )}

                <div className="my-6">
                  {emailStatus === 'sending' && (
                    <p className="text-white mb-4 animate-pulse">Sending results...</p>
                  )}
                  {emailStatus === 'sent' && (
                    <p className="text-white mb-4 font-bold">Results sent successfully!</p>
                  )}
                  {emailStatus === 'error' && (
                    <p className="text-red-200 mb-4">Could not send results automatically.</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <button
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition"
                    onClick={resetTest}
                  >
                    <FiRefreshCw className="mr-2" /> Retake Questionnaire
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg font-bold hover:bg-white/20 transition shadow-lg"
                  >
                    Book a Professional Consultation
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CageQuestionnaire;
