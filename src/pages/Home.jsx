import React from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiUsers,
  FiHeart,
  FiBriefcase,
} from 'react-icons/fi';

const Home = () => {
  const services = [
    {
      icon: <FiHome className="w-6 h-6" />,
      title: 'Inpatient Rehabilitation',
      description: 'Comprehensive care in a supportive environment.',
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: 'Counseling',
      description: 'Individual and group therapy sessions.',
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: 'Wellness Programs',
      description: 'Holistic approaches to enhance well-being.',
    },
    {
      icon: <FiBriefcase className="w-6 h-6" />,
      title: 'Corporate Wellness',
      description: 'Mental health solutions for your workplace.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Nairobi, Kenya',
      content:
        'The team at Momentum Wellness helped me through a difficult time in my life. Their compassionate approach made all the difference.',
      initials: 'SM',
    },
    {
      name: 'David K.',
      location: 'Mombasa, Kenya',
      content:
        "Professional, caring, and effective. I couldn't have asked for better support during my recovery journey.",
      initials: 'DK',
    },
    {
      name: 'Grace W.',
      location: 'Kisumu, Kenya',
      content:
        'The wellness programs transformed how I approach mental health. I now have tools that help me every day.',
      initials: 'GW',
    },
  ];

  const stats = [
    { number: '500+', label: 'Lives Changed' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <main className="px-4 md:px-10 lg:px-20 py-8 flex justify-center">
      <div className="layout-content-container flex flex-col max-w-6xl w-full">
        <Hero />

        <SectionTitle>Our Services</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </div>

        <SectionTitle>Our Impact</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <SectionTitle>What Our Clients Say</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <h3 className="testimonial-author">{t.name}</h3>
                  <p className="testimonial-location">{t.location}</p>
                </div>
              </div>
              <p className="testimonial-content">"{t.content}"</p>
              <div className="flex text-yellow-500 mt-3" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-8 rounded-xl"
          style={{ background: 'var(--gradient-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Take the first step toward better mental health. Our professionals are here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-secondary bg-white text-gray-800 hover:bg-gray-100 border-white">
                Schedule Consultation
              </button>
              <button className="btn-secondary border-white text-white hover:bg-white hover:text-gray-800">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Home;
