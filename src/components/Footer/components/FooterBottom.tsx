import React from 'react';

const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

const FooterBottom = () => (
  <div className="footer-bottom">
    <p className="footer-copyright">© 2025 Health Me. All rights reserved.</p>
    <div className="footer-legal">
      {LEGAL_LINKS.map((label) => (
        <a key={label} href="#" className="legal-link">{label}</a>
      ))}
    </div>
  </div>
);

export default FooterBottom;
