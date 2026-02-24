import React from 'react';

const CONTACT_ITEMS = [
  { icon: '📍', text: '123 Fitness Street, Gym City' },
  { icon: '📞', text: '+1 (555) 123-4567' },
  { icon: '✉️', text: 'info@healthme.com' },
  { icon: '🕒', text: 'Mon-Fri: 6AM-10PM' },
];

const FooterContact = () => (
  <div className="footer-section">
    <h3 className="footer-title">Contact</h3>
    <ul className="footer-contacts">
      {CONTACT_ITEMS.map(({ icon, text }) => (
        <li key={text} className="contact-item">
          <span className="contact-icon">{icon}</span>
          <span className="contact-text">{text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default FooterContact;
