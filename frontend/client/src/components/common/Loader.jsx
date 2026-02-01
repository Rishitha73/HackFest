// src/components/common/Loader.jsx
import React from 'react';

const Loader = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-accent border-t-text-secondary rounded-full animate-spin`}
      />
    </div>
  );
};

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-primary-bg">
    <div className="text-center">
      <Loader size="large" />
      <p className="mt-4 text-text-secondary">Loading...</p>
    </div>
  </div>
);

export default Loader;