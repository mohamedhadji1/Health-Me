import React from 'react';
import { motion } from 'framer-motion';

interface NewsletterCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  animDelay?: number;
}

/**
 * Optional newsletter opt-in checkbox with helper text.
 */
const NewsletterCheckbox = ({ checked, onChange, animDelay = 0.58 }: NewsletterCheckboxProps) => (
  <motion.div
    className="form-group"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: animDelay, duration: 0.4 }}
  >
    <label className="checkbox-label">
      <input
        type="checkbox"
        name="sendEmailUpdates"
        checked={checked}
        onChange={onChange}
        className="checkbox-input"
      />
      <span className="checkbox-custom" />
      <span>
        Send me a once-a-week email with meal ideas
        <span className="checkbox-helper">
          Optional! These can help maintain your meal planning mindset, and you can opt-out at any
          time.
        </span>
      </span>
    </label>
  </motion.div>
);

export default NewsletterCheckbox;
