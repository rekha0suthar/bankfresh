import React from 'react';
import Nav from './Nav';
import ServiceMenu from './ServiceMenu';

const Container = ({ children }) => {
  return (
    <>
      <Nav />
      <ServiceMenu />
      {children}
    </>
  );
};

export default Container;
