import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import logo from '../assets/mowet_logo.png';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
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
  const [isDark, setIsDark] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <header className="sticky top-0 z-30 bg-darkBg/90 backdrop-blur-md border-b border-borderSecondary px-4 md:px-10 py-3 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img src={logo} alt="Mowet Kenya Logo" className="h-10 w-auto" />
        <h2 className="text-white text-lg font-bold tracking-tight">Mowet Kenya</h2>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10">
        {navItems.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-white hover:text-primary'
              }`
            }
          >
            {name}
          </NavLink>
        ))}
        <button className="btn-primary">
          <span className="truncate">Book Appointment</span>
        </button>
        <button onClick={toggleTheme} className="text-white hover:text-primary transition-colors">
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </nav>

      {/* Mobile Buttons */}
      <div className="md:hidden flex items-center gap-4 z-20">
        <button onClick={toggleTheme} className="text-white">
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <button onClick={toggleMenu} className="text-white">
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="fixed inset-0 z-10 bg-darkBg/90 backdrop-blur-md flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {navItems.map(({ name, path }) => (
                <motion.div key={name} variants={itemVariants}>
                  <NavLink
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-medium text-white hover:text-primary transition-colors"
                  >
                    {name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.button variants={itemVariants} className="btn-primary mt-4">
                <span className="truncate">Book Appointment</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
