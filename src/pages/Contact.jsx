import React, { useState, useRef } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import emailjs from '@emailjs/browser';
import cnta from "../assets/contact.png";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    message: "" 
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (status === "error" || status === "invalid_email") {
      setStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("invalid_email");
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      // ✅ FIXED: Use import.meta.env for Vite (instead of process.env)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debug: Log to check if env variables are loaded
      console.log('EmailJS Config Check:', {
        serviceId: serviceId ? `${serviceId.substring(0, 8)}... ✓` : 'Missing ✗',
        templateId: templateId ? `${templateId.substring(0, 8)}... ✓` : 'Missing ✗',
        publicKey: publicKey ? `${publicKey.substring(0, 5)}... ✓` : 'Missing ✗'
      });

      // Check if environment variables are loaded
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your .env file.');
      }

      // Prepare template parameters to match EmailJS template
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        title: "Contact Form Submission",
        phone: formData.phone || "Not provided"
      };

      console.log('Sending email...');

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('✅ Email sent successfully:', response);

      // Success
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus(null);
      }, 5000);

    } catch (error) {
      console.error("❌ EmailJS Error:", error);
      
      if (error.text) {
        console.error("Error details:", error.text);
      }
      
      setStatus("send_error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-16 px-4 md:px-10 lg:px-20"
      style={{ backgroundColor: "var(--light-bg)", color: "var(--text-primary)" }}
    >
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title">Contact Us</h2>
        <p className="page-description">
          We're here to help. Reach out to us with any questions or to schedule an appointment.  
          Our team typically responds within 24 hours.
        </p>
      </div>

      {/* Hero Image */}
      <div className="mt-10 max-w-3xl mx-auto">
        <img
          src={cnta}
          alt="Our Team"
          className="rounded-2xl shadow-lg w-full object-cover"
        />
      </div>

      {/* Contact Info + Form */}
      <div className="mt-16 grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="card flex items-start gap-4">
            <FiMail className="text-[var(--primary)] text-2xl flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">Email</h3>
              <a 
                href="mailto:tech@mowet.co.ke"
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              >
                info@mowet.co.ke
              </a>
            </div>
          </div>
          
          <div className="card flex items-start gap-4">
            <FiPhone className="text-[var(--primary)] text-2xl flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">Phone</h3>
              <div className="flex flex-col text-[var(--text-secondary)]">
                <a
                  href="tel:+254707727913"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  0707 727 913
                </a>
                <a
                  href="tel:+254720200220"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  0720 200 220
                </a>
              </div>
            </div>
          </div>
          
          <div className="card flex items-start gap-4">
            <FiMapPin className="text-[var(--primary)] text-2xl flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">Location</h3>
              <p className="text-[var(--text-secondary)]">Nairobi, Kenya</p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="card">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">Office Hours</h3>
            <div className="space-y-2 text-[var(--text-secondary)]">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-red-500">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
            Send us a Message
          </h3>

          {/* Success Message */}
          {status === "success" && (
            <div
              className="mb-6 p-4 rounded-lg border animate-fade-in"
              style={{
                background: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
                color: "#065F46",
                borderColor: "#6EE7B7",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold mb-1">Message sent successfully!</p>
                  <p className="text-sm">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Messages */}
          {status === "error" && (
            <div
              className="mb-6 p-4 rounded-lg border animate-fade-in"
              style={{
                background: "#FEE2E2",
                color: "#991B1B",
                borderColor: "#FCA5A5",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <p>Please fill in all required fields.</p>
              </div>
            </div>
          )}

          {status === "invalid_email" && (
            <div
              className="mb-6 p-4 rounded-lg border animate-fade-in"
              style={{
                background: "#FEE2E2",
                color: "#991B1B",
                borderColor: "#FCA5A5",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <p>Please enter a valid email address.</p>
              </div>
            </div>
          )}

          {status === "send_error" && (
            <div
              className="mb-6 p-4 rounded-lg border animate-fade-in"
              style={{
                background: "#FEE2E2",
                color: "#991B1B",
                borderColor: "#FCA5A5",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">❌</span>
                <div>
                  <p className="font-semibold mb-1">Failed to send message</p>
                  <p className="text-sm">Please check the browser console for details, or contact us directly via phone/email.</p>
                </div>
              </div>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="form-label" htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="form-label" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            {/* Phone Field (Optional) */}
            <div>
              <label className="form-label" htmlFor="phone">
                Phone Number <span className="text-sm text-gray-400">(Optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0700 000 000"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                disabled={isSubmitting}
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="form-label" htmlFor="message">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
                rows="5"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary btn-large w-full"
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg 
                    className="animate-spin h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-[var(--text-secondary)] text-center">
              By submitting this form, you agree to our{" "}
              <a href="/privacy" className="text-[var(--primary)] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-6">
          Visit Our Office
        </h3>
        <div className="card overflow-hidden p-0">
          <iframe
            title="Mowet Kenya Location"
            src="https://www.google.com/maps?q=-1.411611,36.690167(Mowet)&hl=en&z=15&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;