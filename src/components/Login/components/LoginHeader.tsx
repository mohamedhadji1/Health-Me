import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Login page header: real app logo + title, subtitle with Register link.
 */
const LoginHeader = () => (
  <motion.div
    className="auth-header"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <img src="/images/HealthMeLogo.png" alt="HealthMe" className="auth-logo" />
    <h2 className="auth-title">Log In</h2>
    <p className="auth-subtitle">
      Don't have an account?{' '}
      <Link to="/signup" className="auth-link">Register</Link>
    </p>
  </motion.div>
);

export default LoginHeader;


