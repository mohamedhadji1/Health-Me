import React from 'react';
import { motion } from 'framer-motion';

export interface SubmitButtonProps {
  isLoading: boolean;
  text: React.ReactNode;
  loadingText: React.ReactNode;
  className: string;
  animDelay?: number;
  onClick?: () => void;
}

const SubmitButton = ({
  isLoading,
  text,
  loadingText,
  className,
  animDelay = 0.6,
  onClick,
}: SubmitButtonProps) => (
  <motion.button
    type="submit"
    className={className}
    disabled={isLoading}
    onClick={onClick}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: animDelay, duration: 0.4 }}
    whileHover={{ scale: isLoading ? 1 : 1.02 }}
    whileTap={{ scale: isLoading ? 1 : 0.98 }}
  >
    {isLoading ? (
      <span className="btn-loading">
        <span className="spinner" />
        {loadingText}
      </span>
    ) : (
      text
    )}
  </motion.button>
);

export default SubmitButton;
