import React from 'react';
import { motion } from 'framer-motion';
import { fadeInLeft } from '../../../utils/animations';

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => (
  <motion.div
    className="feature-item"
    variants={fadeInLeft}
    whileHover={{ x: 10, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <motion.div
      className="feature-icon"
      whileHover={{ rotate: 360, scale: 1.2 }}
      transition={{ duration: 0.6 }}
    >
      <span className="animate-float">{icon}</span>
    </motion.div>
    <div className="feature-content">
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  </motion.div>
);

export default FeatureItem;
