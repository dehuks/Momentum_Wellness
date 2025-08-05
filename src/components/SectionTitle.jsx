import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ children }) => {
  return (
    <motion.h2 
      className="section-title fade-in"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  );
};

export default SectionTitle;