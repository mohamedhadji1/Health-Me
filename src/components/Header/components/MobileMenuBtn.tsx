import React from 'react';
import { motion } from 'framer-motion';

const MobileMenuBtn = () => (
  <motion.button
    className="mobile-menu-btn"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <motion.svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      whileHover={{ rotate: 90 }}
      transition={{ duration: 0.3 }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </motion.svg>
  </motion.button>
);

export default MobileMenuBtn;
