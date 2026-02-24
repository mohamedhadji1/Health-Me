import React from 'react';
import { motion } from 'framer-motion';
import FloatingCard from './FloatingCard';

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

interface HeroImageProps {
  variants: object;
}

const HeroImage = ({ variants }: HeroImageProps) => (
  <motion.div className="hero-right" variants={variants}>
    <motion.div
      className="hero-image-container"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
    >
      <motion.div
        className="hero-main-image"
        whileHover={{ scale: 1.02, rotate: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.div className="hero-placeholder animate-float">
          <img src="/images/AppleLogo.png" alt="Health Fit Logo" className="hero-logo-image" />
        </motion.div>

        <FloatingCard
          position="top"
          icon="🔥"
          iconClass="calories animate-rotate"
          value="350+"
          label="Calories Burned"
          floatingVariants={floatingVariants}
          animDelay={1}
          offset={50}
          valueDelay={1.5}
        />

        <FloatingCard
          position="bottom"
          icon="💧"
          iconClass="water animate-glow"
          value="2.5L"
          label="Water Intake"
          floatingVariants={floatingVariants}
          animDelay={1.2}
          offset={-50}
          valueDelay={1.7}
        />
      </motion.div>
    </motion.div>

    <div className="bg-decoration decoration-1 animate-rotate"></div>
    <div className="bg-decoration decoration-2 animate-rotate"></div>
  </motion.div>
);

export default HeroImage;
