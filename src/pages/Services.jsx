import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import serviceImage from '../assets/services.png?format=webp';
import { services } from '../data/services';
import { blogApi } from '../lib/blogApi';

const faqs = [
  {
    question: "How do I know which service is right for me?",
    answer: "We recommend starting with an initial consultation where our specialists will assess your needs and recommend the most appropriate services. You can also call our helpline for guidance before booking."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Yes. Everything you share with us is treated as strictly confidential and is only shared with the professionals directly involved in your care. We will not contact your employer or family without your consent, except in the rare cases where the law requires us to act to keep you or someone else safe."
  },
  {
    question: "How much does treatment cost, and do you accept insurance?",
    answer: "Costs depend on the programme and the length of care you need, so we'll give you a clear quote after your initial assessment. We work with a number of insurance providers. Contact us with your insurance details and we'll confirm what your cover includes."
  },
  {
    question: "How does the home-based detox programme work?",
    answer: "Our home-based detox lets you withdraw safely in the privacy of your own home, under medical supervision. You receive a personalised recovery plan, regular medical monitoring and 24/7 professional support throughout. We first assess whether detoxing at home is safe for you; if it isn't, we'll recommend inpatient care instead."
  },
  {
    question: "How long does treatment typically last?",
    answer: "Treatment duration varies based on individual needs. Some clients see improvement in 4-6 sessions, while others benefit from longer-term therapy or a residential stay. Your care team will discuss a treatment plan with you during your first session."
  },
  {
    question: "Can my family be involved in my recovery?",
    answer: "Yes, with your permission. Recovery is often stronger with the support of loved ones, and we can involve family members in planning your care. Ask our team about visiting arrangements if you are receiving inpatient treatment."
  },
  {
    question: "Do you offer online sessions?",
    answer: "Yes. Our counselling services are available both in person and online, so you can get support wherever you are in Kenya."
  },
  {
    question: "What happens after my treatment ends?",
    answer: "Recovery continues after treatment. Before you finish, we'll work with you on a plan for staying well, which can include ongoing counselling and regular check-ins with our team. Our support line is available 24/7 if you ever need us."
  },
];

const Services = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const location = useLocation();
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
            <SectionTitle className="page-title">Our Services</SectionTitle>
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
          At Mowet Kenya, we provide a full spectrum of mental health services delivered by experienced professionals.
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
                    onClick={() => navigate(`/services/${service.key}`)}
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
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <motion.div
                key={faq.question}
                className="border-b border-[var(--border-color)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex justify-between items-center gap-4 py-4 text-left font-medium text-lg text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {faq.question}
                    <FiChevronDown
                      className={`w-5 h-5 shrink-0 text-[var(--primary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${index}`}
                      role="region"
                      aria-labelledby={`faq-q-${index}`}
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-[var(--text-secondary)] pb-5 pr-9 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
