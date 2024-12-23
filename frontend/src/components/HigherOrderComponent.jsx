import React from 'react';
import Nav from './Nav';
import ServiceMenu from './ServiceMenu';

const HigherOrderComponent = ({ children }) => {
  return (
    <>
      <Nav />
      <ServiceMenu />
      {children}
    </>
  );
};

export default HigherOrderComponent;
