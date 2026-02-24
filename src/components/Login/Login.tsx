import React from 'react';
import { motion } from 'framer-motion';
import './Login.css';
import { useLoginForm } from './hooks/useLoginForm';
import LoginHeader from './components/LoginHeader';
import LoginFields from './components/LoginFields';
import SocialLogin from './components/SocialLogin';

const Login = () => {
  const {
    formData,
    errors,
    isLoading,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword,
  } = useLoginForm();

  return (
    <section className="login-section">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginHeader />

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <LoginFields
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            showPassword={showPassword}
            onTogglePassword={togglePassword}
            onChange={handleChange}
          />
        </form>

        {/* Demo credentials banner */}
        <div style={{
          margin: '0.75rem 0',
          padding: '0.875rem 1rem',
          background: 'rgba(34,197,94,0.07)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: '10px',
          fontSize: '0.78rem',
          color: '#94a3b8',
          lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 700, color: '#22c55e', marginBottom: '0.35rem' }}>🎬 Demo accounts</div>
          <div><span style={{ color: '#f1f5f9' }}>alex@demo.com</span> · <span style={{ color: '#64748b' }}>Muscle Gain</span></div>
          <div><span style={{ color: '#f1f5f9' }}>sara@demo.com</span> · <span style={{ color: '#64748b' }}>Weight Loss</span></div>
          <div style={{ marginTop: '0.25rem', color: '#64748b' }}>Password: <span style={{ color: '#f1f5f9' }}>password123</span></div>
        </div>

        <SocialLogin />

        <div className="auth-page-footer">
          <div className="auth-footer-links">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
          <p className="auth-footer-copy">&copy;2026 Health Me, Inc.</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;

