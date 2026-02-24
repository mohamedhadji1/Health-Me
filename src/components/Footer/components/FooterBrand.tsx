import React from 'react';

const SOCIAL_LINKS = [
  { icon: '📘', href: '#' },
  { icon: '📷', href: '#' },
  { icon: '🐦', href: '#' },
  { icon: '💼', href: '#' },
];

const FooterBrand = () => (
  <div className="footer-brand">
    <img
      src="/images/HealthMeLogo.png"
      alt="Health Me Logo"
      className="footer-logo"
      style={{
        height: '40px',
        width: 'auto',
        filter: 'drop-shadow(1px 1px 2px rgba(255,255,255,0.3))',
      }}
    />
    <p className="footer-description">
      Take the first step towards a healthier, stronger you with our comprehensive fitness programs and expert guidance.
    </p>
    <div className="footer-social">
      {SOCIAL_LINKS.map(({ icon, href }) => (
        <a key={icon} href={href} className="social-link">
          <span>{icon}</span>
        </a>
      ))}
    </div>
  </div>
);

export default FooterBrand;
