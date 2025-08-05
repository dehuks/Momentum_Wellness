import React from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiUsers, 
  FiHeart, 
  FiBriefcase 
} from 'react-icons/fi';

const Home = () => {
  const services = [
    { 
      icon: <FiHome className="w-6 h-6" />, 
      title: "Inpatient Rehabilitation", 
      description: "Comprehensive care in a supportive environment." 
    },
    { 
      icon: <FiUsers className="w-6 h-6" />, 
      title: "Counseling", 
      description: "Individual and group therapy sessions." 
    },
    { 
      icon: <FiHeart className="w-6 h-6" />, 
      title: "Wellness Programs", 
      description: "Holistic approaches to enhance well-being." 
    },
    { 
      icon: <FiBriefcase className="w-6 h-6" />, 
      title: "Corporate Wellness", 
      description: "Mental health solutions for your workplace." 
    },
  ];

  return (
    <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-6xl flex-1">
        <Hero />
        <SectionTitle>Our Services</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        
        {/* Testimonials Section */}
        <SectionTitle>What Our Clients Say</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {[1, 2, 3].map((item) => (
            <motion.div 
              key={item}
              className="rounded-xl bg-cardBg p-6 border border-borderColor"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div>
                  <h3 className="text-white font-bold">John D.</h3>
                  <p className="text-textSecondary text-sm">Nairobi, Kenya</p>
                </div>
              </div>
              <p className="text-textSecondary">
                "The team at Momentum Wellness helped me through a difficult time in my life. Their compassionate approach made all the difference."
              </p>
              <div className="flex text-yellow-400 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;