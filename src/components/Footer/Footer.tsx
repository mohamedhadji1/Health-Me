import React from 'react';
import FooterBrand from './components/FooterBrand';
import FooterLinks from './components/FooterLinks';
import FooterContact from './components/FooterContact';
import FooterBottom from './components/FooterBottom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <FooterBrand />
        <FooterLinks />
        <FooterContact />
      </div>
      <FooterBottom />
    </div>
  </footer>
);

export default Footer;
