import React from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { href: '#home', label: 'Home' },
  { href: '#programs', label: 'Programs' },
  { href: '#why-us', label: 'Why us' },
  { href: '#plans', label: 'Plans' },
  { href: '#testimonials', label: 'Testimonials' },
];

const NavLinks = () => (
  <motion.nav
    className="nav"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.6 }}
  >
    {NAV_ITEMS.map(({ href, label }) => (
      <motion.a
        key={href}
        href={href}
        className="nav-link"
        whileHover={{ scale: 1.1, color: '#22c55e' }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        {label}
      </motion.a>
    ))}
  </motion.nav>
);

export default NavLinks;
