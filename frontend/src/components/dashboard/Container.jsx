import React, { lazy, Suspense } from 'react';

const Nav = lazy(() => import('./Nav'));
const ServiceMenu = lazy(() => import('./ServiceMenu'));

const Container = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Nav />
      <ServiceMenu />
      {children}
    </Suspense>
  );
};

export default Container;
