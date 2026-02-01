// src/components/common/Modal.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'medium',
  closeOnOverlayClick = true 
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizes = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl',
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`relative z-50 w-full ${sizes[size]} mx-auto`}
          >
            <div className="bg-primary-bg rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              {(title || onClose) && (
                <div className="flex items-center justify-between p-6 border-b border-border">
                  {title && (
                    <h3 className="text-xl font-semibold text-text-primary">
                      {title}
                    </h3>
                  )}
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="p-1 rounded-lg hover:bg-secondary-bg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5 text-text-secondary" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default Modal;