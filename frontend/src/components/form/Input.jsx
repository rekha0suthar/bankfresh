import React from 'react';

const Input = ({ value, setValue, placeholder, type, className }) => {
  return (
    <input
      type={type ? type : 'text'}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={className}
      onCopy={e => e.preventDefault()}
      onPaste={e => e.preventDefault()}
      required
    />
  );
};

export default Input;
