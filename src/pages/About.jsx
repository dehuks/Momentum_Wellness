import React from 'react';
import SectionTitle from '../components/SectionTitle';
import ValueCard from '../components/ValueCard';
import { 
  FiHeart, 
  FiUsers, 
  FiShield, 
  FiCompass 
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const About = () => {
  const values = [
    { 
      icon: <FiHeart className="w-6 h-6" />, 
      title: "Compassion", 
      description: "We approach every individual with empathy, understanding, and genuine care." 
    },
    { 
      icon: <FiUsers className="w-6 h-6" />, 
      title: "Collaboration", 
      description: "We work together with clients, families, and communities to achieve shared goals." 
    },
    { 
      icon: <FiShield className="w-6 h-6" />, 
      title: "Integrity", 
      description: "We uphold the highest ethical standards and maintain confidentiality." 
    },
    { 
      icon: <FiCompass className="w-6 h-6" />, 
      title: "Respect", 
      description: "We treat every person with dignity and respect, valuing their unique experiences." 
    },
  ];

  return (
    <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-6xl flex-1">
        <div className="flex flex-wrap justify-between gap-6 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <motion.h1 
              className="page-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Us
            </motion.h1>
            <motion.p 
              className="page-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Momentum Wellness is a leading mental health service provider in Kenya, dedicated to promoting emotional well-being and resilience. Our team of experienced professionals offers comprehensive care tailored to individual needs.
            </motion.p>
          </div>
          <motion.div 
            className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 md:w-80 md:h-80"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <SectionTitle>Our Background</SectionTitle>
        <p className="content-text">
          Founded in 2018, Momentum Wellness emerged from a shared vision among a group of mental health experts to address the growing need for accessible and quality mental health services in Kenya. We recognized the stigma surrounding mental health and aimed to create a safe, supportive environment where individuals could seek help without fear or judgment. Over the years, we have expanded our services and reach, becoming a trusted resource for individuals, families, and communities.
        </p>
        
        <div className="flex w-full my-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-96" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <SectionTitle>Our Vision</SectionTitle>
            <p className="content-text">
              To be the leading provider of mental health services in Kenya, recognized for our commitment to excellence, innovation, and compassionate care. We envision a society where mental health is prioritized, and everyone has access to the support they need to thrive.
            </p>
          </div>
          
          <div>
            <SectionTitle>Our Mission</SectionTitle>
            <p className="content-text">
              To empower individuals to achieve optimal mental well-being through comprehensive, evidence-based services delivered with empathy and respect. We strive to reduce the stigma associated with mental health and promote a culture of understanding and support.
            </p>
          </div>
        </div>
        
        <SectionTitle>Our Values</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
        
        <SectionTitle>Our Core Beliefs</SectionTitle>
        <p className="content-text">
          At Momentum Wellness, we believe that mental health is essential to overall well-being. We are committed to providing personalized care that addresses the unique needs of each individual. Our approach is holistic, focusing on the interconnectedness of mind, body, and spirit. We believe in the power of resilience and the capacity of individuals to overcome challenges and lead fulfilling lives.
        </p>
        
        {/* Team Section */}
        <SectionTitle>Meet Our Team</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
          {[1, 2, 3, 4].map((item) => (
            <motion.div 
              key={item}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mb-4" />
              <h3 className="text-white font-bold">Dr. Jane Smith</h3>
              <p className="text-textSecondary">Clinical Psychologist</p>
              <p className="text-textSecondary text-sm mt-2">10+ years of experience in cognitive behavioral therapy</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;