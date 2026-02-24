import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => (
  <motion.img
    src="/images/HealthMeLogo.png"
    alt="Health Me Logo"
    className="logo"
    style={{
      height: '40px',
      width: 'auto',
      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))',
      padding: '4px 8px',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))'
    }}
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 400 }}
  />
);

export default Logo;
