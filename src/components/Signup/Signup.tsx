import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Signup.css';
import { useSignupWizard } from './hooks/useSignupWizard';
import { useAuth } from '../../context/AuthContext';
import SignupHeader from './components/SignupHeader';
import TermsCheckbox from './components/TermsCheckbox';
import NewsletterCheckbox from './components/NewsletterCheckbox';
import SocialLogin from './components/SocialLogin';
import StepMacros from './components/StepMacros';
import StepPlan from './components/StepPlan';
import FormField from '../ui/FormField';
import PasswordInput from '../ui/PasswordInput';
import SubmitButton from '../ui/SubmitButton';

/** Person icon for Create Account button */
const PersonIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor"
    style={{ width: '1rem', height: '1rem', flexShrink: 0 }} aria-hidden="true">
    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a4 4 0 118 0A4 4 0 016 8zM1.5 17.5A8.5 8.5 0 0118.5 17.5a.5.5 0 01-1 0A7.5 7.5 0 002.5 17.5a.5.5 0 01-1 0z" />
  </svg>
);

/* Card width per step */
const CARD_CLASSES: Record<1 | 2 | 3, string> = {
  1: 'signup-card',
  2: 'signup-card signup-card--macros',
  3: 'signup-card signup-card--plan',
};

const Signup = () => {
  const {
    step,
    formData,
    errors,
    isLoading,
    showPassword,
    showConfirmPassword,
    macroResults,
    handleChange,
    handleSubmitStep1,
    handleContinueFromMacros,
    handleSelectProgram,
    goBackTo,
    togglePassword,
    toggleConfirmPassword,
  } = useSignupWizard();

  const { user } = useAuth();

  return (
    <section className="signup-section">
      <motion.div
        className={CARD_CLASSES[step]}
        layout
        transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <SignupHeader step={step} />

        <AnimatePresence mode="wait">
          {/* ══ Step 1: Account form ══ */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <form className="signup-form" onSubmit={handleSubmitStep1} noValidate>
                {/* Username */}
                <FormField label="Username" htmlFor="signup-username" error={errors.username} animDelay={0.1}>
                  <input
                    id="signup-username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`form-input${errors.username ? ' input-error' : ''}`}
                    autoComplete="username"
                  />
                </FormField>

                {/* Email */}
                <FormField label="Email" htmlFor="signup-email" error={errors.email} animDelay={0.18}>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input${errors.email ? ' input-error' : ''}`}
                    autoComplete="email"
                  />
                </FormField>

                {/* Password */}
                <FormField label="Password" htmlFor="signup-password" error={errors.password} animDelay={0.26}>
                  <PasswordInput
                    id="signup-password"
                    name="password"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    hasError={!!errors.password}
                    autoComplete="new-password"
                    show={showPassword}
                    onToggle={togglePassword}
                  />
                </FormField>

                {/* Confirm Password */}
                <FormField label="Confirm Password" htmlFor="signup-confirmPassword" error={errors.confirmPassword} animDelay={0.34}>
                  <PasswordInput
                    id="signup-confirmPassword"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    hasError={!!errors.confirmPassword}
                    autoComplete="new-password"
                    show={showConfirmPassword}
                    onToggle={toggleConfirmPassword}
                  />
                </FormField>

                {/* Terms of Service */}
                <TermsCheckbox
                  checked={formData.agreeToTerms}
                  error={errors.agreeToTerms}
                  onChange={handleChange}
                  animDelay={0.4}
                />

                {/* Newsletter opt-in */}
                <NewsletterCheckbox
                  checked={formData.sendEmailUpdates}
                  onChange={handleChange}
                  animDelay={0.46}
                />

                <SubmitButton
                  isLoading={isLoading}
                  text={
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <PersonIcon /> Create Account →
                    </span>
                  }
                  loadingText="Creating Account…"
                  className="signup-btn"
                  animDelay={0.52}
                />
              </form>

              <SocialLogin />

              <div className="auth-page-footer">
                <div className="auth-footer-links">
                  <a href="#terms">Terms of Service</a>
                  <a href="#privacy">Privacy Policy</a>
                </div>
                <p className="auth-footer-copy">&copy;2026 Health Me, Inc.</p>
              </div>
            </motion.div>
          )}

          {/* ══ Step 2: Macro calculator ══ */}
          {step === 2 && (
            <StepMacros
              key="step2"
              onContinue={handleContinueFromMacros}
              onBack={() => goBackTo(1)}
            />
          )}

          {/* ══ Step 3: Choose plan ══ */}
          {step === 3 && (
            <StepPlan
              key="step3"
              macroResults={macroResults}
              onConfirm={handleSelectProgram}
              onBack={() => goBackTo(2)}
              username={user?.username}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Signup;

