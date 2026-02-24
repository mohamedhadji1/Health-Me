import React from 'react';

const LEGAL_LINKS: { label: string; href: string }[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

const FooterBottom = () => (
  <div className="footer-bottom">
    <p className="footer-copyright">© 2025 Health Me. All rights reserved.</p>
    <div className="footer-legal">
      {LEGAL_LINKS.map(({ label, href }) => (
        <a key={label} href={href} className="legal-link">{label}</a>
      ))}
    </div>
  </div>
);

export default FooterBottom;
