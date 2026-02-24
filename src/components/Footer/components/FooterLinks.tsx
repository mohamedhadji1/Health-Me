import React from 'react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#programs', label: 'Programs' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#plans', label: 'Plans' },
  { href: '#testimonials', label: 'Testimonials' },
];

const FooterLinks = () => (
  <div className="footer-section">
    <h3 className="footer-title">Quick Links</h3>
    <ul className="footer-links">
      {LINKS.map(({ href, label }) => (
        <li key={href}>
          <a href={href} className="footer-link">{label}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterLinks;
