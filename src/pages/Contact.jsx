import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

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
              Contact Us
            </motion.h1>
            <motion.p
              className="page-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We're here to help. Reach out to us with any questions or to schedule an appointment.
              Our team typically responds within 24 hours.
            </motion.p>
          </div>
          <motion.div 
            className="w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden border border-borderColor"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/assets/images/contact-hero.jpg"
              alt="Momentum Wellness Center"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>Send Us a Message</SectionTitle>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-500 rounded-lg">
                <div className="flex items-center text-green-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Your message has been sent successfully! We'll contact you soon.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-cardBg border ${
                    errors.name ? 'border-red-500' : 'border-borderColor'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-cardBg border ${
                      errors.email ? 'border-red-500' : 'border-borderColor'
                    } focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Your email address"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-white mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-cardBg border ${
                      errors.phone ? 'border-red-500' : 'border-borderColor'
                    } focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Your phone number"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg bg-cardBg border ${
                    errors.message ? 'border-red-500' : 'border-borderColor'
                  } focus:outline-none focus:ring-2 focus:ring-primary`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionTitle>Our Location</SectionTitle>

            <div className="bg-cardBg border border-borderColor rounded-lg p-6 mb-6">
              <div className="flex items-start mb-4">
                <div className="text-primary mr-3 mt-1">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Headquarters</h3>
                  <p className="text-textSecondary">
                    Momentum Wellness Center<br />
                    P.O. BOX 514-00206 <br />
                    Kiserian, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <div className="text-primary mr-3 mt-1">
                  <FiPhone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Phone</h3>
                  <p className="text-textSecondary">
                    +254 758 810 232<br />
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <div className="text-primary mr-3 mt-1">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Email</h3>
                  <p className="text-textSecondary">
                    info@momentumwellness.co.ke<br />
                    support@momentumwellness.co.ke
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-primary mr-3 mt-1">
                  <FiClock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Working Hours</h3>
                  <p className="text-textSecondary">
                    Monday-Friday: 8:00 AM - 8:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-borderColor mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3988.4123456789!2d36.6901666!3d-1.4116111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMcKwMjQnNDEuOCJTIDM2wrA0MScyNC42IkU!5e0!3m2!1sen!2ske!4v1690000000000!5m2!1sen!2ske"
                width="100%"
                height="256"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Headquarters Map"
              />
            </div>
            <p className="text-textSecondary text-sm text-center">
              View on Google Maps
            </p>

            <SectionTitle className="mt-8">Emergency Contact</SectionTitle>
            <div className="bg-cardBg border border-borderColor rounded-lg p-6">
              <p className="text-textSecondary mb-4">
                If you're experiencing a mental health emergency, please contact us immediately or visit the nearest hospital.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="btn-primary flex-1">
                  <span>Call Emergency Line</span>
                </button>
                <button className="bg-darkBg border border-primary text-primary rounded-lg h-10 px-4 flex-1 font-bold">
                  <span>Find Nearest Hospital</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Branch Locations */}
        <SectionTitle>Our Branches</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { 
              city: "Nairobi", 
              address: "123 Serenity Lane, Westlands", 
              phone: "+254 712 345 678",
              mapSrc: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3988.4123456789!2d36.6901666!3d-1.4116111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMcKwMjQnNDEuOCJTIDM2wrA0MScyNC42IkU!5e0!3m2!1sen!2ske!4v1690000000000!5m2!1sen!2ske"
            },
            { 
              city: "Mombasa", 
              address: "456 Coral Road, Nyali", 
              phone: "+254 734 567 890",
              mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8234567890123!2d39.7031119!3d-4.0434771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012a6b7445dc1%3A0x940b62a3c8efde21!2sNyali%2C%20Mombasa!5e0!3m2!1sen!2ske!4v1690000000001!5m2!1sen!2ske"
            },
            { 
              city: "Kisumu", 
              address: "789 Lakeview Drive", 
              phone: "+254 721 234 567",
              mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1234567890123!2d34.7680147!3d-0.0917012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa4b7445dc1%3A0x940b62a3c8efde22!2sKisumu%2C%20Kenya!5e0!3m2!1sen!2ske!4v1690000000002!5m2!1sen!2ske"
            },
          ].map((branch, index) => (
            <motion.div 
              key={index}
              className="bg-cardBg border border-borderColor rounded-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden border border-borderColor">
                  <iframe
                    src={branch.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${branch.city} Branch Map`}
                  />
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold">{branch.city}</h3>
                  <p className="text-textSecondary text-sm mt-1">{branch.address}</p>
                </div>
              </div>
              <div className="flex items-center text-textSecondary mt-4">
                <FiPhone className="w-4 h-4 mr-2" />
                <span>{branch.phone}</span>
              </div>
              <button className="btn-primary mt-4 w-full">
                <span>View Location</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;