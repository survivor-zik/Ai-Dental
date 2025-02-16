import React from 'react';

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  white: "bg-white text-black hover:bg-gray-100",
  outline: "bg-transparent text-gray-400 border border-gray-800 hover:bg-gray-800",
  google: "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 flex items-center justify-center"
};

export const Button = ({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}) => {
  return (
    <button
      className={`px-6 py-2 rounded-lg transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};