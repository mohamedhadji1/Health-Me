import React from 'react';
import { motion } from 'framer-motion';

const NavDots = () => (
  <motion.div
    className="testimonials-nav"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    {[true, false, false].map((active, i) => (
      <motion.div
        key={i}
        className={`nav-dot ${active ? 'active' : ''}`}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
      />
    ))}
  </motion.div>
);

export default NavDots;
