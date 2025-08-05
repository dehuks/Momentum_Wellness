import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="hero-section fade-in">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          Empowering Minds, Embracing Wellness
        </h1>
        <h2 className="hero-subtitle">
          Your journey to mental well-being starts here. We offer comprehensive mental health services tailored to your needs.
        </h2>
      </motion.div>
      <motion.button 
        className="btn-primary btn-large slide-up"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="truncate">Explore Services</span>
      </motion.button>
    </div>
  );
};

export default Hero;