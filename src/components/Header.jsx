import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/mowet_logo.png';
import AppointmentModal from '../AppointmentModal';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Careers', path: '/careers' },
  { name: 'Blog', path: 'https://mowet.co.ke/blog', external: true },
  { name: 'Contact', path: '/contact' },
];

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleBookAppointmentClick = () => {
    setIsBookingModalOpen(true);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || isBookingModalOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen, isBookingModalOpen]);

  return (
    <>
      <AppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Main Header */}
      <header
        className={`sticky top-0 z-30 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-[var(--border-color)] shadow-[0_4px_20px_rgba(13,148,136,0.1)]'
            : 'bg-[#F8FAFC] border-b border-transparent'
        }`}
      >
        {/* Top accent stripe — only visible when scrolled */}
        <div
          className={`h-[3px] w-full transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'var(--gradient-primary)' }}
        />

        {/* Nav row */}
        <div className="px-4 md:px-10 py-3.5 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Mowet Kenya Logo"
              className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-85"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[var(--text-primary)] text-base font-bold tracking-tight">
                MOWET Kenya
              </span>
              <span className="text-[10px] font-medium tracking-widest text-[var(--primary)] uppercase">
                Momentum Wellness
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(({ name, path, external }) =>
              external ? (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors duration-200 group pb-1"
                >
                  {name}
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-[var(--primary)] transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <NavLink
                  key={name}
                  to={path}
                  end={path === '/'}
                  className="relative text-sm font-medium transition-colors duration-200 group pb-1"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={
                          isActive
                            ? 'text-[var(--primary)] font-semibold'
                            : 'text-[var(--text-secondary)] group-hover:text-[var(--primary)]'
                        }
                      >
                        {name}
                      </span>
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-[var(--primary)] transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              )
            )}

            <button
              className="btn-primary ml-2"
              onClick={handleBookAppointmentClick}
            >
              <span className="truncate">Book Appointment</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4 z-40 relative">
            <button
              onClick={toggleMenu}
              className="text-[var(--text-primary)] p-1 rounded-lg hover:bg-[var(--border-color)] transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="fixed inset-0 z-20 md:hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            {/* Accent strip on mobile menu */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: 'var(--gradient-primary)' }}
            />


            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
              <div className="flex flex-col items-center gap-6 text-center max-w-sm w-full">

                {navItems.map(({ name, path, external }) => (
                  <motion.div key={name} variants={itemVariants} className="w-full">
                    {external ? (
                      <a
                        href={path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-2xl font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors py-2 px-4 rounded-xl hover:bg-[var(--gradient-accent)]"
                      >
                        {name}
                      </a>
                    ) : (
                      <NavLink
                        to={path}
                        end={path === '/'}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block text-2xl font-semibold transition-colors py-2 px-4 rounded-xl ${
                            isActive
                              ? 'text-[var(--primary)] bg-[var(--gradient-accent)]'
                              : 'text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-slate-50'
                          }`
                        }
                      >
                        {name}
                      </NavLink>
                    )}
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="mt-4 w-full">
                  <button
                    className="btn-primary w-full py-4 text-base font-semibold"
                    onClick={handleBookAppointmentClick}
                  >
                    <span className="truncate">Book Appointment</span>
                  </button>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
