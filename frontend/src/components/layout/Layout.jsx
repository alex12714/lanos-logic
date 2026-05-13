import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import StarBackground from '../common/StarBackground';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0a0a12]">
      <StarBackground />
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
