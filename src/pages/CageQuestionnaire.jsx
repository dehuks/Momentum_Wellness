import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiArrowLeft, FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import { Link } from 'react-router-dom';
import AssessmentFollowUp from '../components/AssessmentFollowUp';

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

  const topRef = useRef(null);
  const score = Object.values(answers).filter((ans) => ans === "yes").length;
  const highRisk = score >= 2;

  // Scroll after the result (or reset form) has rendered: scrolling inside the click
  // handler ran before the page shrank, and phones cancelled the half-finished scroll.
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [submitted]);

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetTest = () => {
    setAnswers({});
    setSubmitted(false);
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
              <>
              <motion.div
                className="p-10 rounded-2xl shadow-xl text-center text-white"
                style={{ background: "var(--gradient-primary)" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {highRisk ? (
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

              <AssessmentFollowUp
                testName="Alcohol Use (CAGE)"
                emailTitle="CAGE Assessment"
                scoreData={score}
                interpretation={highRisk ? "High Risk (Potential alcohol concerns)" : "Low Risk"}
                concerning={highRisk}
              />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CageQuestionnaire;
