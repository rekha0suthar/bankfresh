import React from 'react';

const Wrapper = ({ children, heading }) => {
  return (
    <div className="main-container">
      <h2 className="heading">{heading}</h2>
      {children}
    </div>
  );
};

export default Wrapper;
