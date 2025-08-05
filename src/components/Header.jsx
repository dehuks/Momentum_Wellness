import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/mowet_logo.png'; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-borderSecondary px-4 md:px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        {/* Replace SVG with Logo Image */}
        <img src={logo} alt="Mowet Kenya Logo" className="h-10 w-auto" />
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          Mowet Kenya
        </h2>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-primary' : 'text-white hover:text-primary'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-primary' : 'text-white hover:text-primary'}`
            }
          >
            About Us
          </NavLink>
          <NavLink 
            to="/services" 
            className={({ isActive }) => 
              `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-primary' : 'text-white hover:text-primary'}`
            }
          >
            Services
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-primary' : 'text-white hover:text-primary'}`
            }
          >
            Contact
          </NavLink>
        </div>
        <button className="btn-primary">
          <span className="truncate">Book Appointment</span>
        </button>
      </nav>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white z-20"
        onClick={toggleMenu}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-darkBg z-10 flex flex-col items-center justify-center md:hidden"
        >
          <div className="flex flex-col items-center gap-8 text-center">
            <NavLink 
              to="/" 
              className="text-xl font-medium text-white hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className="text-xl font-medium text-white hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/services" 
              className="text-xl font-medium text-white hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </NavLink>
            <NavLink 
              to="/contact" 
              className="text-xl font-medium text-white hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <button className="btn-primary mt-4">
              <span className="truncate">Book Appointment</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
   