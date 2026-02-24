import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
  delay: number;
}

const STATS: Stat[] = [
  { value: '200+', label: 'Health Experts', delay: 1 },
  { value: '1.2K+', label: 'Success Stories', delay: 1.2 },
  { value: '75+', label: 'Wellness Programs', delay: 1.4 },
];

interface HeroStatsProps {
  variants: object;
}

const HeroStats = ({ variants }: HeroStatsProps) => (
  <motion.div className="hero-stats" variants={variants}>
    {STATS.map(({ value, label, delay }) => (
      <motion.div
        key={label}
        className="stat"
        whileHover={{ scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <motion.div
          className="stat-number"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay, type: 'spring', stiffness: 200 }}
        >
          {value}
        </motion.div>
        <div className="stat-label">{label}</div>
      </motion.div>
    ))}
  </motion.div>
);

export default HeroStats;
