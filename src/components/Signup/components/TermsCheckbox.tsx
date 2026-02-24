import React from 'react';
import { motion } from 'framer-motion';

interface TermsCheckboxProps {
  checked: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  animDelay?: number;
}

/** External link icon */
const ExternalLinkIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    style={{ width: '0.75rem', height: '0.75rem', display: 'inline', verticalAlign: 'middle', marginLeft: '0.15rem' }}
    aria-hidden="true"
  >
    <path d="M6.22 8.72a.75.75 0 001.06 1.06l5.22-5.22v1.69a.75.75 0 001.5 0v-3.5a.75.75 0 00-.75-.75h-3.5a.75.75 0 000 1.5h1.69L6.22 8.72z" />
    <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 007 4H4.75A2.75 2.75 0 002 6.75v4.5A2.75 2.75 0 004.75 14h4.5A2.75 2.75 0 0012 11.25V9a.75.75 0 00-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5z" />
  </svg>
);

/**
 * "I agree to the Terms of Service" checkbox with external link icon.
 */
const TermsCheckbox = ({ checked, error, onChange, animDelay = 0.5 }: TermsCheckboxProps) => (
  <motion.div
    className="form-group"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: animDelay, duration: 0.4 }}
  >
    <label className="checkbox-label">
      <input
        type="checkbox"
        name="agreeToTerms"
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <span className="checkbox-custom" />
      <span>
        I agree to the{' '}
        <a href="#terms" className="auth-link">
          Terms of Service
          <ExternalLinkIcon />
        </a>
      </span>
    </label>

    {error && (
      <motion.span
        className="error-message"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {error}
      </motion.span>
    )}
  </motion.div>
);

export default TermsCheckbox;

