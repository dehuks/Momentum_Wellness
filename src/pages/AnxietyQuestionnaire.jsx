import React from 'react';
import { motion } from 'framer-motion';

const AnxietyQuestionnaire = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--light-bg)] p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl text-center"
            >
                <h1 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">Anxiety & Burnout Assessment</h1>
                <p className="text-[var(--text-secondary)] mb-8">
                    This module is currently under development. Please check back later or contact us directly for an assessment.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="btn-primary px-8 py-3 rounded-lg"
                >
                    Go Back
                </button>
            </motion.div>
        </div>
    );
};

export default AnxietyQuestionnaire;
