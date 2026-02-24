import React from 'react';
import { motion } from 'framer-motion';

export interface FormFieldProps {
  /** The <label> text */
  label: string;
  /** The `id` of the bound input — sets htmlFor */
  htmlFor: string;
  /** Optional element rendered on the right side of the label row */
  labelRight?: React.ReactNode;
  /** Animated error text rendered below the input */
  error?: string;
  /** Framer Motion entrance delay in seconds (default 0.3) */
  animDelay?: number;
  children: React.ReactNode;
}

/**
 * Shared form-field wrapper: animated entrance, label, input slot, error message.
 * Drop any input/select/custom control in as `children`.
 */
const FormField = ({
  label,
  htmlFor,
  labelRight,
  error,
  animDelay = 0.3,
  children,
}: FormFieldProps) => (
  <motion.div
    className="form-group"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: animDelay, duration: 0.4 }}
  >
    {labelRight ? (
      <div className="form-label-row">
        <label htmlFor={htmlFor} className="form-label">{label}</label>
        {labelRight}
      </div>
    ) : (
      <label htmlFor={htmlFor} className="form-label">{label}</label>
    )}

    {children}

    {error && (
      <motion.span
        className="error-message"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {error}
      </motion.span>
    )}
  </motion.div>
);

export default FormField;
