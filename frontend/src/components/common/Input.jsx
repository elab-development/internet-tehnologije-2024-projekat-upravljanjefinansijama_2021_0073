import React from 'react';

const Input = ({ label, name, type = 'text', placeholder, value, onChange, required = false, className = '' }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field" // Koristi klasu iz tvog postojećeg CSS-a
      />
    </div>
  );
};

export default Input;