import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`} // Koristi klasu iz tvog postojećeg CSS-a
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;