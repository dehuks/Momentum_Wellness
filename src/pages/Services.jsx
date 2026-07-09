import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { motion } from 'framer-motion';
import serviceImage from '../assets/services.png?format=webp';
import AppointmentModal from '../AppointmentModal';
import { services } from '../data/services';
import { blogApi } from '../lib/blogApi';

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [imageOverrides, setImageOverrides] = useState({});

  useEffect(() => {
    blogApi
      .getSiteImages()
      .then(setImageOverrides)
      .catch((err) => console.error('Error loading site images:', err));
  }, []);

  useEffect(() => {
    if (location.hash === '#faqs') {
      const timer = setTimeout(() => {
        document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const handleOpenModal = (serviceTitle) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleLearnMore = (service) => {
    if (service.gallery && service.gallery.length > 0) {
      navigate(`/services/${service.key}`);
    } else {
      handleOpenModal(service.title);
    }
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-5 bg-[var(--light-bg)]">
      <div className="layout-content-container flex flex-col max-w-6xl flex-1 text-[var(--text-primary)]">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center gap-6 p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>Our Services</SectionTitle>
          </motion.div>

          <motion.p
            className="page-description max-w-2xl text-[var(--text-secondary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our comprehensive range of mental health services designed to support your journey to well-being.
            Each program is tailored to meet individual needs with evidence-based approaches.
          </motion.p>

          <motion.img
            src={serviceImage}
            alt="Our services"
            className="rounded-xl w-full max-w-4xl h-72 md:h-96 object-cover shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            decoding="async"
          />
        </div>

        {/* Services Grid */}
        <SectionTitle>Comprehensive Mental Health Services</SectionTitle>
        <p className="content-text mb-8 text-[var(--text-secondary)]">
          At Momentum Wellness, we provide a full spectrum of mental health services delivered by experienced professionals.
          Our evidence-based approaches are designed to address the unique needs of each individual, helping you achieve sustainable
          mental wellness and improved quality of life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                className={`relative flex flex-col rounded-2xl bg-[var(--card-bg)] border transition-shadow duration-300 hover:shadow-[var(--shadow-hover)] ${
                  service.highlight ? 'border-2 border-[var(--primary)] ring-4 ring-[var(--primary)]/10' : 'border-[var(--border-color)]'
                }`}
                style={{ boxShadow: 'var(--shadow-light)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  <img
                    src={imageOverrides[service.key] || service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover object-top rounded-t-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                  {service.highlight && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[var(--primary)] text-white text-xs font-bold uppercase rounded-full shadow-md">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col items-center text-center px-6 pb-6">
                  <div className="service-icon -mt-7 mb-4 relative z-10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="service-title text-[var(--text-primary)] font-semibold">{service.title}</h2>
                  <p className="service-description mb-3 text-[var(--text-secondary)]">{service.description}</p>
                  <p className="text-[var(--text-secondary)] text-sm">{service.details}</p>
                  <button
                    onClick={() => handleLearnMore(service)}
                    className="btn-primary mt-4 w-full block text-center"
                  >
                    <span>Learn More</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div id="faqs" className="scroll-mt-28">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
        </div>
        <div className="mb-12">
          {[
            {
              question: "How do I know which service is right for me?",
              answer: "We recommend starting with an initial consultation where our specialists will assess your needs and recommend the most appropriate services. You can also call our helpline for guidance before booking."
            },
            {
              question: "Do you accept insurance?",
              answer: "Yes, we work with most major insurance providers in Kenya. Please contact our billing department with your insurance details to verify coverage."
            },
            {
              question: "What safety measures are in place for in-person sessions?",
              answer: "We follow strict health protocols including sanitization, mask requirements, and social distancing. Telehealth options are also available for all counseling services."
            },
            {
              question: "How long does treatment typically last?",
              answer: "Treatment duration varies based on individual needs. Some clients see improvement in 4-6 sessions, while others benefit from longer-term therapy. Your therapist will discuss a treatment plan during your first session."
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-[var(--border-color)] py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-medium text-lg text-[var(--text-primary)]">{faq.question}</h3>
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-[var(--text-secondary)] mt-2">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        serviceName={selectedService}
      />
    </div>
  );
};

export default Services;
