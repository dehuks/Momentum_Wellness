import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { 
  FiHome, 
  FiUsers, 
  FiBriefcase, 
  FiHeart, 
  FiZap,         
  FiUserCheck
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import serviceImage from '../assets/services.png'; 

const Services = () => {
  const services = [
    { 
      icon: <FiHome className="w-8 h-8 text-[var(--primary)]" />, 
      title: "Inpatient Rehabilitation", 
      description: "Comprehensive residential treatment for severe mental health conditions in a supportive environment.",
      details: "Our inpatient program provides 24/7 care with a multidisciplinary team including psychiatrists, psychologists, nurses, and therapists. Patients receive personalized treatment plans, medication management, group therapy, and life skills training."
    },
    { 
      icon: <FiUsers className="w-8 h-8 text-[var(--primary)]" />, 
      title: "Psychological Counseling", 
      description: "Individual and group therapy sessions to address emotional and behavioral challenges.",
      details: "We offer evidence-based therapies including CBT, DBT, and trauma-focused therapy. Our counselors specialize in depression, anxiety, PTSD, relationship issues, and more. Both in-person and telehealth options available."
    },
    { 
      icon: <FiBriefcase className="w-8 h-8 text-[var(--primary)]" />, 
      title: "Occupational Therapy", 
      description: "Therapy focused on improving daily living skills and functional abilities.",
      details: "Our occupational therapists help clients develop or regain skills needed for daily living and work. This includes cognitive rehabilitation, stress management techniques, and adaptive strategies for mental health challenges."
    },
    { 
      icon: <FiHeart className="w-8 h-8 text-[var(--primary)]" />, 
      title: "Wellness Programs", 
      description: "Holistic approaches to enhance overall mental and physical well-being.",
      details: "Our wellness programs include mindfulness meditation, yoga therapy, nutrition counseling, art therapy, and stress reduction workshops. Designed to promote resilience and prevent burnout."
    },
    {
      icon: <FiZap className="w-8 h-8 text-[var(--primary)]" />,
      title: "Neuropsychological Assessments",
      description: "Evaluations to assess cognitive functions and identify neurological issues.",
      details: "Comprehensive assessments for memory, attention, executive functioning, and more. Used to diagnose conditions like ADHD, dementia, traumatic brain injuries, and learning disabilities."
    },
    {
      icon: <FiUserCheck className="w-8 h-8 text-[var(--primary)]" />,
      title: "Corporate Wellness",
      description: "Workplace programs to enhance employee mental health and productivity.",
      details: "Customized programs for organizations including stress management workshops, mental health first aid training, leadership coaching, and confidential employee counseling services."
    }    
  ];

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
          />
        </div>
        
        {/* Services Grid */}
        <SectionTitle>Comprehensive Mental Health Services</SectionTitle>
        <p className="content-text mb-8 text-[var(--text-secondary)]">
          At Momentum Wellness, we provide a full spectrum of mental health services delivered by experienced professionals. 
          Our evidence-based approaches are designed to address the unique needs of each individual, helping you achieve sustainable 
          mental wellness and improved quality of life.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px rgba(22, 206, 114, 0.2)"
              }}
            >
              <div className="service-icon mb-3">
                {service.icon}
              </div>
              <div className="service-content">
                <h2 className="service-title text-[var(--text-primary)] font-semibold">{service.title}</h2>
                <p className="service-description mb-3 text-[var(--text-secondary)]">{service.description}</p>
                <p className="text-[var(--text-secondary)] text-sm">{service.details}</p>
              </div>
              <button className="btn-primary mt-4 w-full">
                <span>Learn More</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Pricing Plans */}
        <SectionTitle>Transparent Pricing</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Initial Consultation", price: "Ksh 2,500", features: ["60-minute session", "Comprehensive assessment", "Treatment plan outline"] },
            { title: "Therapy Session", price: "Ksh 4,000", features: ["50-minute session", "Individualized approach", "Evidence-based techniques"] },
            { title: "Wellness Program", price: "Ksh 15,000", features: ["4-week program", "Weekly group sessions", "Personalized coaching", "Resource materials"] },
          ].map((plan, index) => (
            <motion.div 
              key={index}
              className="rounded-xl bg-[var(--card-bg)] p-6 border border-[var(--border-color)] flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-[var(--text-primary)] text-xl font-bold mb-2">{plan.title}</h3>
              <div className="text-[var(--primary)] text-2xl font-bold mb-4">{plan.price}</div>
              <ul className="flex-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start mb-2">
                    <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary mt-auto">
                <span>Get Started</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <SectionTitle>Frequently Asked Questions</SectionTitle>
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
    </div>
  );
};

export default Services;
