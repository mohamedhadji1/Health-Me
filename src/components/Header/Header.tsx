import React from 'react';
import { motion } from 'framer-motion';
import Logo from './components/Logo';
import NavLinks from './components/NavLinks';
import CTAButton from './components/CTAButton';
import MobileMenuBtn from './components/MobileMenuBtn';
import './Header.css';

const Header = () => (
  <motion.header
    className="header"
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
  >
    <div className="container">
      <div className="header-content">
        <Logo />
        <NavLinks />
        <CTAButton />
        <MobileMenuBtn />
      </div>
    </div>
  </motion.header>
);

export default Header;
