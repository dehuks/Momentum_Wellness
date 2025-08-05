import React from 'react';
import { motion } from 'framer-motion';

const ValueCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="value-card slide-up"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        borderColor: "#16ce72"
      }}
    >
      <div className="text-white">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-white text-base font-bold leading-tight">{title}</h2>
        <p className="text-textSecondary text-sm font-normal leading-normal">{description}</p>
      </div>
    </motion.div>
  );
};

export default ValueCard;