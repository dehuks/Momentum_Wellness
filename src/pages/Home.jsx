import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUsers, FiHeart, FiBriefcase, FiAlertTriangle, FiX, FiActivity, FiCloudDrizzle, FiWind, FiBattery, FiArrowRight, FiLock } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { WhatsAppFloat } from './WhatsappConfig'; // removed WhatsAppButton import
import AppointmentModal from '../AppointmentModal'; // Imported Modal
import AssessmentModal from '../components/AssessmentModal'; // Imported Assessment Modal

const SupportCauseModal = ({ isOpen, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Load Paystack inline script once
  useEffect(() => {
    if (!document.getElementById('paystack-inline-script')) {
      const script = document.createElement('script');
      script.id = 'paystack-inline-script';
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFeedback('');
      setPaymentMethod('mpesa');
      setPhoneNumber('');
      setEmail('');
      setAmount('');
    }
  }, [isOpen]);

  const initiateMpesaPayment = async () => {
    if (!phoneNumber || !amount) {
      setFeedback('Please enter both phone number and amount.');
      return;
    }

    const formattedPhone = phoneNumber.trim().replace(/\s+/g, '');
    if (!/^(254|0)[17]\d{8}$/.test(formattedPhone)) {
      setFeedback('Please enter a valid Kenyan phone number (e.g., 0712345678 or 254712345678)');
      return;
    }

    if (parseFloat(amount) < 1) {
      setFeedback('Minimum donation amount is KES 1');
      return;
    }

    try {
      setLoading(true);
      setFeedback('Initiating payment...');

      const formData = new FormData();
      formData.append('phone_number', formattedPhone);
      formData.append('amount', amount);

      const response = await fetch('https://pay.mowet.co.ke/initiate-payment', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        setFeedback('✓ Payment request sent! Please check your phone and enter your M-Pesa PIN.');
      } else {
        setFeedback(`Payment failed: ${data.error || 'Unknown error'}. Please try again.`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (error.message.includes('JSON')) {
        setFeedback('✓ Request sent! If you saw the M-Pesa prompt, the payment is processing.');
      } else {
        setFeedback('Connection error. Please check your internet and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const initiatePaystackPayment = () => {
    if (!email || !amount) {
      setFeedback('Please enter your email and amount.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback('Please enter a valid email address.');
      return;
    }

    if (parseFloat(amount) < 1) {
      setFeedback('Minimum donation amount is KES 1');
      return;
    }

    if (!window.PaystackPop) {
      setFeedback('Payment library not loaded yet. Please try again in a moment.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(parseFloat(amount) * 100), // Paystack uses smallest currency unit
      currency: 'KES',
      ref: `mowet_${Date.now()}`,
      metadata: { purpose: 'Support Our Cause - Mowet Kenya' },
      onSuccess: async (transaction) => {
        setLoading(true);
        setFeedback('Verifying payment...');
        try {
          const res = await fetch('/paystack/verify.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference: transaction.reference }),
          });
          const data = await res.json();
          if (data.success) {
            setFeedback(`✓ Thank you! Your donation of KES ${data.amount} was received.`);
          } else {
            setFeedback('Payment received but verification pending. Contact us if you need confirmation.');
          }
        } catch {
          setFeedback('✓ Payment successful! Thank you for supporting Mowet Kenya.');
        } finally {
          setLoading(false);
        }
      },
      onCancel: () => setFeedback('Payment cancelled.'),
    });

    handler.openIframe();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-xl shadow-2xl relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <FiX size={24} />
        </button>

        <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Support Our Cause</h3>
        <p className="text-gray-600 mb-5">Your contribution helps us provide mental wellness support to those in need.</p>

        {/* Payment method tabs */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-5">
          <button
            onClick={() => { setPaymentMethod('mpesa'); setFeedback(''); }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              paymentMethod === 'mpesa'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            M-Pesa
          </button>
          <button
            onClick={() => { setPaymentMethod('card'); setFeedback(''); }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors border-l border-gray-200 ${
              paymentMethod === 'card'
                ? 'bg-[#0ba4db] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Card / Other
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethod === 'mpesa' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Phone Number</label>
                <input
                  type="text"
                  placeholder="07XX XXX XXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KES)</label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {feedback && (
                <p className={`text-sm ${feedback.includes('✓') ? 'text-green-600' : 'text-red-500'}`}>
                  {feedback}
                </p>
              )}

              <button
                onClick={initiateMpesaPayment}
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-bold transition-all ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading ? 'Processing...' : 'Donate via M-Pesa'}
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KES)</label>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <p className="text-xs text-gray-500">
                Supports Visa, Mastercard, and M-Pesa via Paystack.
              </p>

              {feedback && (
                <p className={`text-sm ${feedback.includes('✓') ? 'text-green-600' : 'text-red-500'}`}>
                  {feedback}
                </p>
              )}

              <button
                onClick={initiatePaystackPayment}
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-bold transition-all ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0ba4db] hover:bg-[#0993c5]'
                }`}
              >
                {loading ? 'Verifying...' : 'Pay with Card / Paystack'}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};



// Enhanced Image Carousel Component with overlay text
const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Therapy session",
      title: "Professional Therapy",
      subtitle: "One-on-one guidance"
    },
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Peaceful meditation",
      title: "Mindful Wellness",
      subtitle: "Inner peace & balance"
    },
    {
      url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Group therapy",
      title: "Community Support",
      subtitle: "Together we heal"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden rounded-2xl shadow-2xl">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentImage * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 text-white">
              <motion.h3
                key={`title-${index}-${currentImage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: index === currentImage ? 1 : 0, y: index === currentImage ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl font-bold mb-2"
              >
                {image.title}
              </motion.h3>
              <motion.p
                key={`subtitle-${index}-${currentImage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: index === currentImage ? 1 : 0, y: index === currentImage ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/90 text-lg"
              >
                {image.subtitle}
              </motion.p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImage ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
              }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{
            width: `${((currentImage + 1) / images.length) * 100}%`,
            animation: `progress-${currentImage} 5000ms linear infinite`
          }}
        />
      </div>
    </div>
  );
};

// ➡️ Updated Hero Component: Accepts prop to open appointment modal
const Hero = ({ onBookAppointment, ctaRef }) => (
  <div className="hero-section">
    <div className="hero-content">
      <div className="hero-decoration" />

      <div className="flex flex-col items-center gap-8 md:gap-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title mb-4 md:mb-6">
              Empowering Minds,
              <br />
              <span className="hero-title-accent">Embracing Wellness</span>
            </h1>
          </motion.div>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover comprehensive mental wellness solutions tailored to your unique needs. Our expert team provides compassionate care through evidence-based therapeutic approaches in a supportive, healing environment.
          </motion.p>

          <motion.div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* ➡️ MODIFIED: Replaced WhatsAppButton with standard Button trigger for Modal */}
            <button
              onClick={onBookAppointment}
              className="btn-primary btn-large whitespace-nowrap"
            >
              Start Your Journey
            </button>

            <Link to="/services" className="btn-secondary btn-large">
              Explore Services
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <ImageCarousel />
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 md:gap-8 text-sm text-gray-500 md:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
            <span>Licensed Professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--gold)] rounded-full"></div>
            <span>Evidence-Based Care</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
            <span>Confidential & Safe</span>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

const ServiceCard = ({ serviceKey, icon, title, description }) => (
  <Link to={`/services/${serviceKey}`} className="service-card h-full group">
    <div className="service-icon">
      {React.cloneElement(icon, {
        className: "w-7 h-7",
      })}
    </div>
    <h3 className="service-title">{title}</h3>
    <p className="service-description">{description}</p>
    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)]">
      Learn more
      <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </span>
  </Link>
);

const SelfCheckCard = ({ icon, title, description, onStart }) => (
  <button type="button" onClick={onStart} className="self-check-card group">
    <div className="self-check-icon">
      {React.cloneElement(icon, { className: "w-6 h-6", "aria-hidden": true })}
    </div>
    <h3 className="text-lg font-semibold text-[#134E4A]">{title}</h3>
    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold-text)]">
      Start self-check
      <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </span>
  </button>
);

const Home = () => {
  // ➡️ State for CAGE Modal
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [assessmentTestId, setAssessmentTestId] = useState(null);
  const heroCtaRef = useRef(null);
  const openAssessment = (testId = null) => {
    setAssessmentTestId(testId);
    setIsAssessmentModalOpen(true);
  };
  // ➡️ State for Appointment Modal
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  // ➡️ State for Support Cause Modal
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);


  // Keys match src/data/services.js so each card opens its detail page
  const services = [
    {
      key: 'service-inpatient-rehab',
      icon: <FiHome />,
      title: 'Inpatient Rehabilitation',
      description: 'Comprehensive care in a supportive environment.',
    },
    {
      key: 'service-counseling',
      icon: <FiUsers />,
      title: 'Counseling',
      description: 'Individual and group therapy sessions.',
    },
    {
      key: 'service-wellness-programs',
      icon: <FiHeart />,
      title: 'Wellness Programs',
      description: 'Holistic approaches to enhance well-being.',
    },
    {
      key: 'service-corporate-wellness',
      icon: <FiBriefcase />,
      title: 'Corporate Wellness',
      description: 'Mental health solutions for your workplace.',
    },
  ];

  // Ids match AssessmentModal's tests
  const selfChecks = [
    {
      id: 'cage',
      icon: <FiActivity />,
      title: 'Alcohol Use',
      description: 'A short screen for signs that drinking may be becoming a problem.',
    },
    {
      id: 'phq9',
      icon: <FiCloudDrizzle />,
      title: 'Depression',
      description: 'Check in on your mood, sleep, energy and interest over the last two weeks.',
    },
    {
      id: 'anxiety',
      icon: <FiWind />,
      title: 'Anxiety',
      description: 'See how often worry, tension and physical symptoms are affecting you.',
    },
    {
      id: 'burnout',
      icon: <FiBattery />,
      title: 'Burnout',
      description: 'Gauge exhaustion and detachment linked to work or caregiving.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Nairobi, Kenya',
      content:
        'The team at Mowet Kenya helped me through a difficult time in my life. Their compassionate approach made all the difference.',
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

  return (
    <>
      <SupportCauseModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloat avoidRef={heroCtaRef} />

      {/* ➡️ Assessment Modal Integration */}
      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        initialTestId={assessmentTestId}
      />

      {/* ➡️ Appointment Modal Integration */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />

      <main className="px-4 md:px-10 lg:px-20 py-8 flex justify-center" style={{ backgroundColor: 'var(--light-bg)' }}>
        <div className="layout-content-container flex flex-col max-w-6xl w-full">

          {/* Passed the handler to Hero */}
          <Hero onBookAppointment={() => setIsAppointmentModalOpen(true)} ctaRef={heroCtaRef} />

          <SectionTitle>Not Sure Where to Start?</SectionTitle>
          <p className="text-center text-lg text-[var(--text-secondary)] max-w-2xl mx-auto -mt-2 mb-8">
            Take a free self-check. It only takes a few minutes and can help you understand what you're going through.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {selfChecks.map((check, index) => (
              <motion.div
                key={check.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SelfCheckCard
                  icon={check.icon}
                  title={check.title}
                  description={check.description}
                  onStart={() => openAssessment(check.id)}
                />
              </motion.div>
            ))}
          </div>
          <p className="flex items-center justify-center gap-2 text-center text-sm text-[var(--text-secondary)] mt-6">
            <FiLock className="shrink-0 text-[var(--primary)]" aria-hidden="true" />
            Confidential screening tools, not a diagnosis. Discuss your results with a professional.
          </p>

          <SectionTitle>Our Services</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ServiceCard
                  serviceKey={service.key}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
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
                <div className="flex text-[var(--gold)] mt-3" aria-label="5 star rating">
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
                <button
                  onClick={() => openAssessment()}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white text-gray-900 rounded-lg shadow-xl hover:bg-gray-100 transition-all duration-300 border-2 border-white"
                  style={{ textShadow: 'none' }}
                >
                  Get a Self-Assessment Test
                </button>

                {/* ➡️ MODIFIED: Bottom button also triggers the Appointment Modal for consistency */}
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="px-8 py-4 text-lg font-bold text-white rounded-lg border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setIsSupportModalOpen(true)}
                  className="px-8 py-4 text-lg font-bold text-white rounded-lg border-2 border-white
                               hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Support Our Cause
                </button>

              </div>
            </div>
          </motion.div>
        </div>

        <style jsx>{`
          /* Colour tokens live in index.css */

          .btn-primary {
            display: inline-flex;
            height: 2.5rem;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            border-radius: 1rem;
            background: var(--gradient-primary);
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            font-size: 0.875rem;
            font-weight: 700;
            line-height: 1.25rem;
            letter-spacing: 0.015em;
            color: white;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            border: none;
            box-shadow: var(--shadow-primary);
            position: relative;
            overflow: hidden;
          }

          .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
          }

          .btn-primary:hover::before {
            left: 100%;
          }

          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-hover);
          }

          .btn-secondary {
            display: inline-flex;
            height: 2.5rem;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            border-radius: 1rem;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 2px solid var(--primary);
            padding-left: 1.5rem;
            padding-right: 1.5rem;
            font-size: 0.875rem;
            font-weight: 700;
            line-height: 1.25rem;
            letter-spacing: 0.015em;
            color: var(--primary);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
          }

          .btn-secondary:hover {
            background: var(--primary);
            color: white;
            box-shadow: var(--shadow-primary);
            transform: translateY(-2px);
          }

          /* btn-large must come after btn-secondary/btn-primary to win the cascade */
          .btn-large {
            height: 3.5rem;
            padding-left: 2rem;
            padding-right: 2rem;
            font-size: 1.125rem;
            border-radius: 1.25rem;
          }

          /* Mobile-first: on phones the hero hugs its content so visitors reach the
             page's substance quickly; the tall, roomy hero returns from 768px up */
          .hero-section {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem 0.25rem 2rem;
            background: var(--gradient-hero);
            overflow: hidden;
          }

          .hero-decoration {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(ellipse at top left, rgba(64, 224, 208, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at bottom right, rgba(212, 175, 55, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at center, rgba(64, 224, 208, 0.05) 0%, transparent 70%);
            pointer-events: none;
          }

          .hero-content {
            position: relative;
            z-index: 10;
            width: 100%;
          }

          .hero-title {
            font-size: 2.25rem;
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.02em;
            color: #134E4A;
            overflow-wrap: break-word;
          }

          .hero-title-accent {
            background: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero-subtitle {
            font-size: 1.0625rem;
            font-weight: 400;
            line-height: 1.6;
            color: var(--text-secondary);
            max-width: 48rem;
            margin: 0 auto 1.5rem;
          }

          .section-title {
            font-size: 2.25rem;
            font-weight: 700;
            line-height: 1.15;
            letter-spacing: -0.02em;
            color: #134E4A;
            text-align: center;
            margin-bottom: 2rem;
            margin-top: 4rem;
            position: relative;
          }

          .section-title::after {
            content: '';
            display: block;
            width: 48px;
            height: 3px;
            background: var(--gradient-brand-rule);
            margin: 0.75rem auto 0;
            border-radius: 2px;
          }

          .service-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            border-radius: 1.5rem;
            padding: 2rem 1.5rem;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-light);
            position: relative;
            overflow: hidden;
          }

          .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient-primary);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }

          .service-card:hover::before {
            transform: scaleX(1);
          }

          .service-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-hover);
            border-color: var(--primary);
          }

          .service-icon {
            display: flex;
            height: 3.5rem;
            width: 3.5rem;
            align-items: center;
            justify-content: center;
            border-radius: 1rem;
            background: #FFFFFF;
            border: 2px solid var(--primary);
            color: var(--primary);
            box-shadow: 0 2px 8px rgba(13, 148, 136, 0.1);
            transition: all 0.3s ease;
          }

          .service-card:hover .service-icon {
            background: var(--primary);
            color: white;
            box-shadow: var(--shadow-primary);
          }

          .service-title {
            font-size: 1.125rem;
            font-weight: 600;
            line-height: 1.3;
            color: #134E4A;
            min-height: 2.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .service-description {
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.5;
            color: var(--text-secondary);
          }

          .self-check-card {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            width: 100%;
            height: 100%;
            padding: 1.75rem 1.5rem;
            text-align: left;
            border-radius: 1.5rem;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-light);
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          }

          .self-check-card:hover,
          .self-check-card:focus-visible {
            transform: translateY(-4px);
            border-color: var(--gold);
            box-shadow: 0 12px 28px rgba(140, 110, 0, 0.12);
          }

          .self-check-card:focus-visible {
            outline: 2px solid var(--gold-text);
            outline-offset: 2px;
          }

          .self-check-icon {
            display: flex;
            height: 3rem;
            width: 3rem;
            align-items: center;
            justify-content: center;
            border-radius: 0.875rem;
            background: var(--gold-soft);
            color: var(--gold-text);
          }

          .testimonial-card {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            border-radius: 1.5rem;
            padding: 2rem;
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: var(--shadow-light);
            position: relative;
          }

          .testimonial-card::before {
            content: '"';
            position: absolute;
            top: -0.5rem;
            left: 1.5rem;
            font-size: 4rem;
            color: var(--primary);
            opacity: 0.3;
            line-height: 1;
          }

          .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-hover);
          }

          .testimonial-avatar {
            height: 3rem;
            width: 3rem;
            border-radius: 50%;
            background: var(--gradient-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
          }

          .testimonial-content {
            flex: 1;
            color: var(--text-secondary);
            font-style: italic;
            line-height: 1.6;
          }

          .testimonial-author {
            color: var(--text-primary);
            font-weight: 600;
          }

          .testimonial-location {
            color: var(--text-secondary);
            font-size: 0.875rem;
          }

          @keyframes progress-0 {
            0% { width: 0%; }
            100% { width: 33.33%; }
          }
          @keyframes progress-1 {
            0% { width: 33.33%; }
            100% { width: 66.66%; }
          }
          @keyframes progress-2 {
            0% { width: 66.66%; }
            100% { width: 100%; }
          }

          @media (min-width: 768px) {
            .hero-section {
              min-height: 90vh;
              padding: 2rem 1rem;
            }
            .hero-title {
              font-size: 4rem;
            }
            .hero-subtitle {
              font-size: 1.375rem;
              line-height: 1.7;
              margin-bottom: 2rem;
            }
            .section-title {
              font-size: 2.5rem;
            }
          }

          @media (min-width: 1024px) {
            .hero-title {
              font-size: 5rem;
            }
            .section-title {
              font-size: 3rem;
            }
          }
        `}</style>
      </main>
    </>
  );
};

export default Home;