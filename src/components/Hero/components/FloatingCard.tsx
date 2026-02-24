import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCardProps {
  position: 'top' | 'bottom';
  icon: string;
  iconClass: string;
  value: string;
  label: string;
  floatingVariants: object;
  animDelay?: number;
  offset?: number;
  valueDelay?: number;
}

const FloatingCard = ({
  position,
  icon,
  iconClass,
  value,
  label,
  floatingVariants,
  animDelay = 1,
  offset = 50,
  valueDelay = 1.5,
}: FloatingCardProps) => (
  <motion.div
    className={`floating-card card-${position}`}
    variants={floatingVariants}
    animate="animate"
    whileHover={{ scale: 1.1, rotate: position === 'top' ? 5 : -5 }}
    initial={{ x: offset, opacity: 0 }}
    transition={{ delay: animDelay, duration: 0.6 }}
  >
    <div className="card-content">
      <div className={`card-icon ${iconClass}`}>{icon}</div>
      <div className="card-info">
        <motion.div
          className="card-value"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: valueDelay, type: 'spring' }}
        >
          {value}
        </motion.div>
        <div className="card-label">{label}</div>
      </div>
    </div>
  </motion.div>
);

export default FloatingCard;
