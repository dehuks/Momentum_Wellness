// ModalContactForm.jsx
import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

// Helper component for loading spinner
const LoadingSpinner = () => (
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
);


const ModalContactForm = ({ onClose, title }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("invalid_email");
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      // Use your actual environment variables here
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // Assuming you have a template
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing.');
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        title: title || "Appointment Request from Modal", // Specific title
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
    } catch (error) {
      console.error("❌ EmailJS Error:", error);
      setStatus("send_error");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Use motion.div for animation continuity
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <h3 className="text-xl font-bold text-center mb-6 text-[var(--text-primary)]">
            Send Appointment Request
        </h3>

        {/* Success Message */}
        {status === "success" && (
            <div
                className="mb-6 p-3 rounded-lg border"
                style={{
                    background: "#D1FAE5", color: "#065F46", borderColor: "#6EE7B7",
                }}
            >
                <p className="font-semibold text-sm">✅ Request sent! We'll contact you shortly.</p>
                <div className="mt-2 text-center">
                    <button 
                        onClick={onClose}
                        className="text-xs font-bold text-[#065F46] hover:underline"
                    >
                        Close Window
                    </button>
                </div>
            </div>
        )}

        {/* Error Messages */}
        {(status === "error" || status === "invalid_email" || status === "send_error") && (
            <div
                className="mb-6 p-3 rounded-lg border"
                style={{ background: "#FEE2E2", color: "#991B1B", borderColor: "#FCA5A5" }}
            >
                <p className="text-sm">
                    {status === "error" && "⚠️ Please fill in all required fields."}
                    {status === "invalid_email" && "⚠️ Please enter a valid email address."}
                    {status === "send_error" && "❌ Failed to send. Please try WhatsApp or call us."}
                </p>
            </div>
        )}

        {status !== "success" && (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <input
                        id="modal-name"
                        name="name"
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input text-sm"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Email Field */}
                <div>
                    <input
                        id="modal-email"
                        name="email"
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input text-sm"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Message Field */}
                <div>
                    <textarea
                        id="modal-message"
                        name="message"
                        placeholder="Briefly describe your request (e.g., 'Need individual counseling') *"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-input form-textarea text-sm"
                        rows="3"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="btn-primary w-full py-3 text-base"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1 }}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <LoadingSpinner />
                            Sending...
                        </span>
                    ) : (
                        "Submit Appointment Request"
                    )}
                </button>
            </form>
        )}
    </motion.div>
  );
};

export default ModalContactForm;