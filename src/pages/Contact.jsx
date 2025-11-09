import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import cnta from "../assets/contact.png"; // ✅ import your hero image

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
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
            <FiMail className="text-[var(--primary)] text-2xl" />
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Email</h3>
              <p className="text-[var(--text-secondary)]">info@mowetkenya.org</p>
            </div>
          </div>
          <div className="card flex items-start gap-4">
            <FiPhone className="text-[var(--primary)] text-2xl" />
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Phone</h3>
              <div className="flex flex-col text-[var(--text-secondary)]">
                <a
                  href="tel:+254707727913"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  0707 727 913
                </a>
                <a
                  href="tel:+254720200220"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  0720 200 220
                </a>
              </div>
            </div>
          </div>
          <div className="card flex items-start gap-4">
            <FiMapPin className="text-[var(--primary)] text-2xl" />
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Location</h3>
              <p className="text-[var(--text-secondary)]">Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          {status === "success" && (
            <div
              className="mb-6 p-4 rounded-lg border flex items-center"
              style={{
                background: "var(--gradient-accent)",
                color: "var(--text-primary)",
              }}
            >
              ✅ Your message has been sent successfully!
            </div>
          )}

          {status === "error" && (
            <div
              className="mb-6 p-4 rounded-lg border flex items-center"
              style={{
                background: "#FEE2E2",
                color: "#991B1B",
                borderColor: "#FCA5A5",
              }}
            >
              ⚠️ Please fill in all fields before submitting.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className="form-input form-textarea"
              />
            </div>
            <button type="submit" className="btn-primary btn-large w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Embed with marker */}
      <div className="mt-16 max-w-5xl mx-auto">
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
    </section>
  );
};

export default Contact;
