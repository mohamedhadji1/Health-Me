import React from 'react';
import { motion } from 'framer-motion';

const STRENGTH_COLORS: Record<number, string> = {
  0: '#e5e7eb',
  1: '#ef4444',
  2: '#f97316',
  3: '#eab308',
  4: '#22c55e',
};

interface PasswordStrengthProps {
  /** 0 = none, 1 = Weak … 4 = Strong */
  level: number;
  /** Human-readable label returned by computePasswordStrength() */
  label: string;
}

/**
 * Four-segment animated strength bar displayed below the password input.
 * Relies on `.strength-bar-wrapper`, `.strength-bars`, `.strength-bar`,
 * and `.strength-label` CSS classes.
 */
const PasswordStrength = ({ level, label }: PasswordStrengthProps) => (
  <motion.div
    className="strength-bar-wrapper"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="strength-bars">
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="strength-bar"
          style={{
            background: i <= level ? STRENGTH_COLORS[level] : '#e5e7eb',
            transition: 'background 0.3s ease',
          }}
        />
      ))}
    </div>
    <span
      className="strength-label"
      style={{ color: STRENGTH_COLORS[level] }}
    >
      {label}
    </span>
  </motion.div>
);

export default PasswordStrength;
