import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUsers, FiHeart, FiBriefcase } from 'react-icons/fi';
import { Link } from "react-router-dom";

// ...

<Link to="/cage-test">
  <button 
    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white text-gray-900 rounded-lg shadow-xl hover:bg-gray-100 transition-all duration-300 border-2 border-white"
    style={{ textShadow: 'none' }}
  >
    Get Started (CAGE Test)
  </button>
</Link>


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
    <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-2xl">
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
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Overlay text */}
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

      {/* Navigation dots */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>

      {/* Progress bar */}
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

// Enhanced Hero Component
const Hero = () => (
  <div className="hero-section">
    <div className="hero-content">
      {/* Background decoration */}
      <div className="hero-decoration" />
      
      <div className="flex flex-col items-center gap-12 max-w-7xl mx-auto relative z-10">
        {/* Main content */}
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title mb-6">
              Empowering Minds,
              <br />
              <span className="hero-title-accent">Embracing Wellness</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="hero-subtitle mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover comprehensive mental wellness solutions tailored to your unique needs. Our expert team provides compassionate care through evidence-based therapeutic approaches in a supportive, healing environment.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="btn-primary btn-large">
              <span>Start Your Journey</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="btn-secondary btn-large">
              Explore Services
            </button>
          </motion.div>
        </div>

        {/* Enhanced carousel section */}
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <ImageCarousel />
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Licensed Professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Evidence-Based Care</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Confidential & Safe</span>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Section Title Component
const SectionTitle = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

// Service Card Component
const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card">
    <div className="service-icon">
      {React.cloneElement(icon, { 
        className: "w-8 h-8", 
        style: { color: 'white' } 
      })}
    </div>
    <h3 className="service-title">{title}</h3>
    <p className="service-description">{description}</p>
  </div>
);

const Home = () => {
  const services = [
    {
      icon: <FiHome />,
      title: 'Inpatient Rehabilitation',
      description: 'Comprehensive care in a supportive environment.',
    },
    {
      icon: <FiUsers />,
      title: 'Counseling',
      description: 'Individual and group therapy sessions.',
    },
    {
      icon: <FiHeart />,
      title: 'Wellness Programs',
      description: 'Holistic approaches to enhance well-being.',
    },
    {
      icon: <FiBriefcase />,
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

  return (
    <main className="px-4 md:px-10 lg:px-20 py-8 flex justify-center" style={{ backgroundColor: 'var(--light-bg)' }}>
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
            <Link to="/cage">
  <button 
    className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white text-gray-900 rounded-lg shadow-xl hover:bg-gray-100 transition-all duration-300 border-2 border-white"
    style={{ textShadow: 'none' }}
  >
    Get Started (CAGE Test)
  </button>
</Link>
              <button 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-lg border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                style={{ textShadow: 'none' }}
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        /* Custom CSS Variables */
        :root {
          --primary: rgb(121, 159, 206);
          --primary-hover: #3B82F6;
          --accent:rgb(255, 208, 206);
          --accent-hover: rgb(94, 59, 173);
           
          --light-bg: rgb(255, 255, 255);
          --card-bg:rgb(255, 254, 254);
          --border-color: #E5E7EB;
          --border-secondary: #D1D5DB;
         
          --text-primary: #1F2937;
          --text-secondary: #6B7280;
         
          --gradient-primary: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
          --gradient-accent: linear-gradient(135deg, #DBEAFE 0%, #93C5FD 100%);
          --gradient-hero: linear-gradient(135deg, #F8FAFC 0%, #EBF4FF 50%, #F8FAFC 100%);
         
          --shadow-primary: 0 4px 15px rgba(96, 165, 250, 0.2);
          --shadow-accent: 0 4px 15px rgba(167, 139, 250, 0.2);
          --shadow-hover: 0 20px 40px rgba(96, 165, 250, 0.15);
          --shadow-light: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        /* Enhanced Button Components */
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

        .btn-large {
          height: 3.5rem;
          padding-left: 2rem;
          padding-right: 2rem;
          font-size: 1.125rem;
          border-radius: 1.25rem;
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

        /* Enhanced Hero Section */
        .hero-section {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
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
            radial-gradient(ellipse at top left, rgba(96, 165, 250, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .hero-title-accent {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          font-weight: 400;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 48rem;
          margin: 0 auto;
        }

        /* Section Titles */
        .section-title {
          font-size: 2.25rem;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.033em;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 2rem;
          margin-top: 4rem;
          position: relative;
        }

        .section-title::after {
          content: '';
          display: block;
          width: 60px;
          height: 4px;
          background: var(--gradient-primary);
          margin: 1rem auto;
          border-radius: 2px;
        }

        /* Enhanced Service Cards */
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
          height: 4rem;
          width: 4rem;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          background: var(--gradient-primary);
          color: white;
          box-shadow: var(--shadow-primary);
          transition: transform 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1);
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--text-primary);
        }

        .service-description {
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* Enhanced Testimonial Components */
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

        /* Progress bar animation */
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

        /* Responsive Design */
        @media (min-width: 768px) {
          .hero-title {
            font-size: 4rem;
          }
          .hero-subtitle {
            font-size: 1.375rem;
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
  );
};

export default Home;