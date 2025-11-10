import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/mowet_logo.png';


const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },   // ⬅️ Added Blog
  { name: 'Contact', path: '/contact' },
];


const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-30 bg-[var(--card-bg)]/90 backdrop-blur-md border-b border-[var(--border-color)] px-4 md:px-10 py-3 flex items-center justify-between shadow-sm">
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-4">
          <img src={logo} alt="Mowet Kenya Logo" className="h-10 w-auto" />
          <h2 className="text-[var(--text-primary)] text-lg font-bold tracking-tight">
            MOWET Kenya
          </h2>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--text-primary)] hover:text-[var(--primary)]'
                }`
              }
            >
              {name}
            </NavLink>
          ))}
          <button className="btn-primary">
            <span className="truncate">Book Appointment</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4 z-40 relative">
          <button onClick={toggleMenu} className="text-[var(--text-primary)]">
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="fixed inset-0 z-20 md:hidden"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.9) 0%, 
                  rgba(255, 255, 255, 0.85) 50%, 
                  rgba(255, 255, 255, 0.9) 100%
                )`,
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
              <div className="flex flex-col items-center gap-8 text-center max-w-sm w-full">
                {navItems.map(({ name, path }) => (
                  <motion.div key={name} variants={itemVariants} className="w-full">
                    <NavLink
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className="block text-2xl font-medium text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors py-2 px-4 rounded-lg hover:bg-[var(--light-bg)]"
                    >
                      {name}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants} className="mt-6 w-full">
                  <button
                    className="btn-primary w-full py-4 text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
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
