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
    if (status === "error" || status === "invalid_email") setStatus(null);
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
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Check your .env file.');
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        title: "Contact Form Submission",
        phone: formData.phone || "Not provided"
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
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
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title">Contact Us</h2>
        <p className="page-description">
          We're here to help. Reach out with any questions or to schedule an appointment.
        </p>
      </div>

      <div className="mt-10 max-w-3xl mx-auto">
        <img
          src={cnta}
          alt="Our Team"
          className="rounded-2xl shadow-lg w-full object-cover"
        />
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="card flex items-start gap-4">
            <FiMail className="text-[var(--primary)] text-2xl" />
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">Email</h3>
              <a 
                href="mailto:tech@mowet.co.ke"
                className="text-[var(--text-secondary)] hover:text-[var(--primary)]"
              >
                tech@mowet.co.ke
              </a>
            </div>
          </div>

          <div className="card flex items-start gap-4">
            <FiPhone className="text-[var(--primary)] text-2xl" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <div className="flex flex-col text-[var(--text-secondary)]">
                <a href="tel:+254707727913" className="hover:text-[var(--primary)]">0707 727 913</a>
                <a href="tel:+254720200220" className="hover:text-[var(--primary)]">0720 200 220</a>
              </div>
            </div>
          </div>

          <div className="card flex items-start gap-4">
            <FiMapPin className="text-[var(--primary)] text-2xl" />
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-[var(--text-secondary)]">Nairobi, Kenya</p>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-3">Office Hours</h3>
            <div className="space-y-2 text-[var(--text-secondary)]">
              <div className="flex justify-between"><span>Mon–Fri</span><span>8AM – 6PM</span></div>
              <div className="flex justify-between"><span>Saturday</span><span>9AM – 2PM</span></div>
              <div className="flex justify-between"><span>Sunday</span><span className="text-red-500">Closed</span></div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-6">Send us a Message</h3>

          {status === "success" && (
            <div className="mb-6 p-4 rounded-lg border animate-fade-in"
              style={{ background: "linear-gradient(135deg,#D1FAE5,#A7F3D0)", color: "#065F46", borderColor: "#6EE7B7" }}>
              <div className="flex gap-3"><span className="text-2xl">✅</span>
                <div><p className="font-semibold">Message sent successfully!</p><p className="text-sm">We'll reply soon.</p></div>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 p-4 rounded-lg border animate-fade-in"
              style={{ background: "#FEE2E2", color: "#991B1B", borderColor: "#FCA5A5" }}>
              <div className="flex gap-3"><span>⚠️</span><p>Fill in all required fields.</p></div>
            </div>
          )}

          {status === "invalid_email" && (
            <div className="mb-6 p-4 rounded-lg border animate-fade-in"
              style={{ background: "#FEE2E2", color: "#991B1B", borderColor: "#FCA5A5" }}>
              <div className="flex gap-3"><span>⚠️</span><p>Enter a valid email.</p></div>
            </div>
          )}

          {status === "send_error" && (
            <div className="mb-6 p-4 rounded-lg border animate-fade-in"
              style={{ background: "#FEE2E2", color: "#991B1B", borderColor: "#FCA5A5" }}>
              <div className="flex gap-3"><span>❌</span>
                <div><p className="font-semibold">Failed to send message</p><p>Please try again.</p></div>
              </div>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} className="form-input" disabled={isSubmitting} />
            </div>

            <div>
              <label className="form-label">Email *</label>
              <input name="email" value={formData.email} onChange={handleChange} className="form-input" disabled={isSubmitting} />
            </div>

            <div>
              <label className="form-label">Phone (Optional)</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="form-input" disabled={isSubmitting} />
            </div>

            <div>
              <label className="form-label">Message *</label>
              <textarea name="message" rows="5" value={formData.message} onChange={handleChange} className="form-input" disabled={isSubmitting}></textarea>
            </div>

            <button type="submit" className="btn-primary btn-large w-full" disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t text-sm text-center text-[var(--text-secondary)]">
            By submitting, you agree to our{" "}
            <a href="/privacy" className="text-[var(--primary)] hover:underline">Privacy Policy</a>.
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-6">Visit Our Office</h3>
        <div className="card overflow-hidden p-0">
          <iframe
            title="Mowet Kenya Location"
            src="https://www.google.com/maps?q=-1.411611,36.690167(Mowet)&hl=en&z=15&output=embed"
            width="100%" height="400" style={{ border: 0 }} loading="lazy"></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
