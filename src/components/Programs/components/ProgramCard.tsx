import React from 'react';
import { motion } from 'framer-motion';

interface ProgramCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  index: number;
  variants: object;
}

const ProgramCard = ({ icon, title, description, gradient, index, variants }: ProgramCardProps) => (
  <motion.div
    className={`program-card ${gradient}`}
    variants={variants}
    whileHover={{ scale: 1.05, y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <motion.div
      className="program-icon"
      whileHover={{ rotate: 360, scale: 1.2 }}
      transition={{ duration: 0.6 }}
    >
      <span className="animate-float">{icon}</span>
    </motion.div>

    <motion.h3
      className="program-title"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }}
    >
      {title}
    </motion.h3>

    <motion.p
      className="program-description"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.4 }}
    >
      {description}
    </motion.p>

    <motion.div
      className="program-cta"
      whileHover={{ x: 5 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <span>Join Now</span>
      <motion.svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        whileHover={{ x: 3 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </motion.svg>
    </motion.div>
  </motion.div>
);

export default ProgramCard;
