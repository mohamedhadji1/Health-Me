import React from 'react';
import { motion } from 'framer-motion';
import { fadeInRight, staggerContainer, scaleIn } from '../../../utils/animations';

const WhyUsImages = () => (
  <motion.div className="why-us-right" variants={fadeInRight}>
    <motion.div className="images-grid" variants={staggerContainer}>
      <motion.div
        className="main-image"
        variants={scaleIn}
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span className="image-placeholder animate-float">🏋️</span>
      </motion.div>

      <motion.div
        className="small-image image-1"
        variants={scaleIn}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <span className="image-placeholder animate-bounce-in">🤸</span>
      </motion.div>

      <motion.div
        className="small-image image-2"
        variants={scaleIn}
        whileHover={{ scale: 1.1, rotate: -5 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <span className="image-placeholder animate-rotate">🧘</span>
      </motion.div>
    </motion.div>

    <motion.div
      className="floating-stats animate-float"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="stats-content">
        <motion.div
          className="stats-number"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          95%
        </motion.div>
        <div className="stats-label">Success Rate</div>
      </div>
    </motion.div>

    <div className="bg-decoration animate-rotate"></div>
  </motion.div>
);

export default WhyUsImages;
