import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import ContactImage from '../assets/contact.png'; 
import emailjs from '@emailjs/browser';

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

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
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
    if (!formData.message.trim()) newErrors.message = 'Message is required';

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

    emailjs.send(
      "YOUR_SERVICE_ID",      // replace with your EmailJS service ID
      "YOUR_TEMPLATE_ID",     // replace with your EmailJS template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: "info@mowet.com"
      },
      "YOUR_PUBLIC_KEY"       // replace with your EmailJS public key
    )
    .then(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setSubmitSuccess(false), 5000);
    })
    .catch(() => {
      setIsSubmitting(false);
      alert("Something went wrong. Please try again later.");
    });
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-6xl flex-1">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 p-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>Contact Us</SectionTitle>
          </motion.div>
          <motion.p
            className="page-description max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We're here to help. Reach out to us with any questions or to schedule an appointment.
            Our team typically responds within 24 hours.
          </motion.p>
          <motion.img 
            src={ContactImage}
            alt="Momentum Wellness Center"
            className="rounded-xl w-full max-w-4xl h-72 md:h-96 object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 mt-10">
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
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Your message has been sent successfully! We'll contact you soon.</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-cardBg border ${errors.name ? 'border-red-500' : 'border-borderColor'} focus:outline-none focus:ring-2 focus:ring-primary`}
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
                    className={`w-full px-4 py-3 rounded-lg bg-cardBg border ${errors.email ? 'border-red-500' : 'border-borderColor'} focus:outline-none focus:ring-2 focus:ring-primary`}
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
                    className={`w-full px-4 py-3 rounded-lg bg-cardBg border ${errors.phone ? 'border-red-500' : 'border-borderColor'} focus:outline-none focus:ring-2 focus:ring-primary`}
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
                  className={`w-full px-4 py-3 rounded-lg bg-cardBg border ${errors.message ? 'border-red-500' : 'border-borderColor'} focus:outline-none focus:ring-2 focus:ring-primary`}
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
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
