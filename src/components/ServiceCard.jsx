import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="service-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 25px rgba(22, 206, 114, 0.2)"
      }}
    >
      <div className="service-icon">
        {icon}
      </div>
      <div className="service-content">
        <h2 className="service-title">{title}</h2>
        <p className="service-description">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;