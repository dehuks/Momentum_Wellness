import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#16ce72] to-[#14b865] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Momentum Wellness</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering communities through comprehensive mental health and wellness programs. 
              Building resilience, fostering growth, and creating lasting positive change.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a 
                href="#about" 
                className="text-gray-300 hover:text-[#16ce72] transition-colors text-sm"
              >
                About Us
              </a>
              <a 
                href="#services" 
                className="text-gray-300 hover:text-[#16ce72] transition-colors text-sm"
              >
                Our Services
              </a>
              <a 
                href="#programs" 
                className="text-gray-300 hover:text-[#16ce72] transition-colors text-sm"
              >
                Programs
              </a>
              <a 
                href="#team" 
                className="text-gray-300 hover:text-[#16ce72] transition-colors text-sm"
              >
                Our Team
              </a>
              <a 
                href="#contact" 
                className="text-gray-300 hover:text-[#16ce72] transition-colors text-sm"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-[#16ce72] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a 
                  href="mailto:info@momentumwellness.org" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  info@momentumwellness.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-[#16ce72] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a 
                  href="tel:+254123456789" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  +254 123 456 789
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-[#16ce72] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="text-gray-300 text-sm">
                  Nairobi, Kenya
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <p className="text-gray-300 text-sm">
              Stay connected and join our community for updates and wellness tips.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/momentum-wellness-trust"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Follow us on LinkedIn"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-[#0077b5] transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </a>
              
              <a
                href="https://facebook.com/mowetkenya"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Follow us on Facebook"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-[#1877f2] transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </a>
              
              <a
                href="https://instagram.com/mowetkenya"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Follow us on Instagram"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#833ab4] group-hover:via-[#fd1d1d] group-hover:to-[#fcb045] transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 20.149c-1.434 0-2.608-1.175-2.608-2.608V6.459c0-1.434 1.174-2.608 2.608-2.608h7.102c1.434 0 2.608 1.174 2.608 2.608v11.082c0 1.433-1.174 2.608-2.608 2.608H8.449z"/>
                  </svg>
                </div>
              </a>
              
              {/* TikTok placeholder - you can uncomment this when ready */}
              {/*
              <a
                href="https://tiktok.com/@mowetkenya"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Follow us on TikTok"
              >
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-black transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </div>
              </a>
              */}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © 2025 Momentum Wellness Trust. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-[#16ce72] transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-[#16ce72] transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="text-gray-400 hover:text-[#16ce72] transition-colors text-sm"
              >
                Cookie Policy
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center space-x-2 text-gray-400 hover:text-[#16ce72] transition-colors text-sm"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <svg 
                className="w-4 h-4 group-hover:-translate-y-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Newsletter Signup Section (Optional) */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for wellness tips and program updates.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#16ce72] focus:ring-1 focus:ring-[#16ce72] text-sm"
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