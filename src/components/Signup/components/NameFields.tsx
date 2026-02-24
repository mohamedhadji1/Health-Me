import React from 'react';
import { motion } from 'framer-motion';
import { SignupFormData, SignupErrors } from '../hooks/useSignupForm';

interface NameFieldsProps {
  formData: Pick<SignupFormData, 'username'>;
  errors: Pick<SignupErrors, 'username'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  animDelay?: number;
}

/**
 * @deprecated Use the Username FormField directly in Signup.tsx instead.
 * Kept for reference; no longer rendered.
 */
const NameFields = ({ formData, errors, onChange, animDelay = 0.25 }: NameFieldsProps) => (
  <motion.div
    className="form-group"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: animDelay, duration: 0.4 }}
  >
    <label htmlFor="signup-username" className="form-label">Username</label>
    <input
      id="signup-username"
      type="text"
      name="username"
      value={formData.username}
      onChange={onChange}
      className={`form-input${errors.username ? ' input-error' : ''}`}
      autoComplete="username"
    />
  </motion.div>
);

export default NameFields;

