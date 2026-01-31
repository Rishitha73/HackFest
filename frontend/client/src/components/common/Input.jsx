// src/components/common/Input.jsx
import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-3 border ${
          error ? 'border-red-500' : 'border-border'
        } rounded-lg bg-secondary-bg text-text-primary placeholder:text-disabled focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 ${className}`}
        {...props}
      />
      {(error || helperText) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-text-secondary'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;