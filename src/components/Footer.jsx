import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#16ce72] to-[#14b865] rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Momentum Wellness
              </h3>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Empowering communities through comprehensive mental health and wellness programs. 
              Building resilience, fostering growth, and creating lasting positive change.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {[
                { label: "About Us", href: "#about" },
                { label: "Our Services", href: "#services" },
                { label: "Programs", href: "#programs" },
                { label: "Our Team", href: "#team" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
<div className="space-y-4">
  <h4 className="text-lg font-semibold text-[var(--text-primary)]">Get In Touch</h4>
  <div className="space-y-3 text-sm">
    <div className="flex items-center space-x-3">
      <svg
        className="w-4 h-4 text-[var(--primary)] flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      <a
        href="mailto:info@mowet.co.ke"
        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        info@mowet.co.ke
      </a>
    </div>
    <div className="flex items-center space-x-3">
  <svg
    className="w-4 h-4 text-[var(--primary)] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
  <div className="flex flex-col">
    {/* Main Contact */}
    <a
      href="tel:+254708046101"
      className="text-[var(--text-primary)] font-medium hover:text-[var(--primary)] transition-colors"
    >
      0708 046 101
    </a>

    {/* Secondary Contacts */}
    <a
      href="tel:+254707727913"
      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
    >
      0707 727 913
    </a>
    <a
      href="tel:+254720200220"
      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
    >
      0720 200 220
    </a>
  </div>
</div>

    <div className="flex items-start space-x-3">
      <svg
        className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <span className="text-[var(--text-secondary)]">Nairobi, Kenya</span>
    </div>
  </div>
</div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Follow Us</h4>
            <p className="text-[var(--text-secondary)] text-sm">
              Stay connected and join our community for updates and wellness tips.
            </p>
            <div className="flex space-x-4">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/momentum-wellness-trust"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="LinkedIn"
              >
                <div className="w-10 h-10 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full flex items-center justify-center group-hover:bg-[#0077b5] transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </div>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com/mowetkenya"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Facebook"
              >
                <div className="w-10 h-10 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full flex items-center justify-center group-hover:bg-[#1877f2] transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/mowetkenya"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Instagram"
              >
                <div className="w-10 h-10 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#833ab4] group-hover:via-[#fd1d1d] group-hover:to-[#fcb045] transition-all duration-300 group-hover:scale-110">
                  <svg
                    className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 20.149c-1.434 0-2.608-1.175-2.608-2.608V6.459c0-1.434 1.174-2.608 2.608-2.608h7.102c1.434 0 2.608 1.174 2.608 2.608v11.082c0 1.433-1.174 2.608-2.608 2.608H8.449z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border-color)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[var(--text-secondary)] text-sm">
              © 2025 Momentum Wellness Trust. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { label: "Privacy Policy", href: "#privacy" },
                { label: "Terms of Service", href: "#terms" },
                { label: "Cookie Policy", href: "#cookies" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors text-sm"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <svg
                className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Stay Updated
            </h4>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              Subscribe to our newsletter for wellness tips and program updates.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] text-sm"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-[#16ce72] to-[#14b865] text-white rounded-lg hover:from-[#14b865] hover:to-[#12a456] transition-all duration-300 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 