import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import AppointmentModal from '../AppointmentModal';
import { getServiceByKey } from '../data/services';
import { blogApi } from '../lib/blogApi';

const ServiceDetail = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const service = getServiceByKey(key);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageOverrides, setImageOverrides] = useState({});

  useEffect(() => {
    blogApi
      .getSiteImages()
      .then(setImageOverrides)
      .catch((err) => console.error('Error loading site images:', err));
  }, []);

  if (!service) {
    return (
      <div className="px-4 md:px-10 lg:px-20 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
          We couldn't find that service.
        </p>
        <Link to="/services" className="btn-secondary inline-flex items-center gap-2">
          <FiArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const Icon = service.icon;
  const heroImage = imageOverrides[service.key] || service.image;

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 bg-[var(--light-bg)]">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold mb-6"
          style={{ color: 'var(--primary)' }}
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Services
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden mb-8"
          style={{ boxShadow: 'var(--shadow-hover)' }}
        >
          <img
            src={heroImage}
            alt={service.title}
            className="w-full h-64 md:h-96 object-cover object-top"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.65), rgba(15,23,42,0) 55%)' }}
          />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 flex items-center gap-4">
            <div className="service-icon flex-shrink-0" style={{ backgroundColor: '#FFFFFF' }}>
              <Icon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">{service.title}</h1>
          </div>
        </motion.div>

        <motion.p
          className="text-lg mb-2"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {service.description}
        </motion.p>
        <motion.p
          className="mb-10 max-w-3xl"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {service.details}
        </motion.p>

        {service.gallery && service.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#134E4A' }}>
              {service.title} in Action
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.gallery.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`${service.title} activity ${i + 1}`}
                  className="w-full h-72 md:h-80 object-cover object-top rounded-2xl"
                  style={{ boxShadow: 'var(--shadow-light)' }}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mb-16">
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            Book a Consultation
          </button>
          <Link to="/services" className="btn-secondary">
            Explore Other Services
          </Link>
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={service.title}
      />
    </div>
  );
};

export default ServiceDetail;
