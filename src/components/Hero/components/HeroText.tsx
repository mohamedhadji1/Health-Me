import React from 'react';
import { motion } from 'framer-motion';

interface HeroTextProps {
  variants: object;
}

const HeroText = ({ variants }: HeroTextProps) => (
  <motion.div className="hero-text" variants={variants}>
    <motion.h1
      className="hero-title"
      variants={variants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      YOUR JOURNEY TO
      <motion.span
        className="hero-highlight"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: '100% 50%' }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
      >
        OPTIMAL HEALTH
      </motion.span>
      STARTS HERE
    </motion.h1>
    <motion.p className="hero-description" variants={variants}>
      Transform your lifestyle with personalized wellness programs designed to help you achieve lasting health and vitality
    </motion.p>
  </motion.div>
);

export default HeroText;
