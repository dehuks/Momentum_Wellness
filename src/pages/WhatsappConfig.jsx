import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

// --- Configuration ---
const WHATSAPP_CONFIG = {
  // Replace with your actual WhatsApp Business number (Kenyan format: 254XXXXXXXXX)
  phoneNumber: '254720200220', // CHANGE THIS TO YOUR NUMBER
  defaultMessage: 'Hello Mowet Kenya! I would like to book an appointment for mental wellness services.',
};

// --- Utility Function ---
export const getWhatsAppUrl = (customMessage = null) => {
  const message = encodeURIComponent(customMessage || WHATSAPP_CONFIG.defaultMessage);
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`;
};

// --- 1. WhatsApp Button Component ---
// Note: This uses your project's defined 'btn-primary' and 'btn-secondary' CSS classes.
export const WhatsAppButton = ({ 
  message = null, 
  className = '', 
  children = 'Book via WhatsApp',
  variant = 'primary' // 'primary' or 'secondary'
}) => {
  const whatsappUrl = getWhatsAppUrl(message);

  const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${className} inline-flex items-center gap-2`}
    >
      <FaWhatsapp className="w-5 h-5" />
      <span className="truncate">{children}</span>
    </a>
  );
};

// --- 2. Floating WhatsApp Widget ---
// This uses internal CSS for complex animations (pulse and fade-in).
// avoidRef (optional): an element the button must never cover. While that element
// passes under the button's corner (e.g. full-width buttons on a phone), the
// button fades out and reappears once the element has scrolled clear.
export const WhatsAppFloat = ({ avoidRef = null }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isTucked, setIsTucked] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!avoidRef) return undefined;
    // One getBoundingClientRect per scroll event is cheap, and React skips the
    // re-render when the tucked state hasn't changed
    const check = () => {
      const el = avoidRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Corner the button occupies, with a little breathing room (see .whatsapp-float)
      const zoneTop = window.innerHeight - 100;
      const zoneLeft = window.innerWidth - 100;
      setIsTucked(r.bottom > zoneTop && r.top < window.innerHeight && r.right > zoneLeft);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [avoidRef]);

  if (!isVisible) return null;

  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      aria-hidden={isTucked || undefined}
      tabIndex={isTucked ? -1 : undefined}
      style={{ pointerEvents: isTucked ? 'none' : 'auto' }}
      initial={{ opacity: 0, y: 20 }}
      animate={isTucked ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      transition={{ duration: isTucked ? 0.2 : 0.5 }}
    >
      <FaWhatsapp className="whatsapp-icon" />
      <span className="whatsapp-pulse"></span>
      
      {/* Internal CSS for the Floating Widget */}
      <style jsx>{`
        .whatsapp-float {
          position: fixed;
          width: 60px;
          height: 60px;
          bottom: 30px;
          right: 30px;
          background-color: #25D366;
          color: #FFF;
          border-radius: 50px;
          text-align: center;
          font-size: 30px;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .whatsapp-float:hover {
          background-color: #128C7E;
          transform: translateY(-5px);
          box-shadow: 0 6px 30px rgba(37, 211, 102, 0.6);
        }

        .whatsapp-icon {
          width: 32px;
          height: 32px;
          position: relative;
          z-index: 2;
        }

        .whatsapp-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid #25D366;
          border-radius: 50%;
          animation: pulse 2s infinite;
          opacity: 0;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
          }
          
          .whatsapp-icon {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </motion.a>
  );
};


// --- 3. WhatsApp Link Component ---
export const WhatsAppLink = ({ 
  message = null, 
  children = 'Chat on WhatsApp',
  className = ''
}) => {
  const whatsappUrl = getWhatsAppUrl(message);
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      // Using Tailwind/CSS variables for text styling
      className={`inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors ${className}`}
    >
      <FaWhatsapp className="w-5 h-5" />
      {children}
    </a>
  );
};