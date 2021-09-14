import React from 'react';
import Navigation from './Navigation';
// import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default Layout;
