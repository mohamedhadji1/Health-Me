import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const STEPS = [
  { num: 1, label: 'Account' },
  { num: 2, label: 'Your Macros' },
  { num: 3, label: 'Your Plan' },
];

const TITLES = ['Create Account', 'Calculate Your Macros', 'Choose Your Program'];
const SUBTITLES = [
  'account',
  'Step 2 of 3 — personalise your daily nutrition targets',
  'Step 3 of 3 — pick the plan that matches your goal',
];

interface Props {
  step: 1 | 2 | 3;
}

/**
 * Signup wizard header: logo + 3-step progress indicator + title.
 */
const SignupHeader: React.FC<Props> = ({ step }) => (
  <motion.div
    className="auth-header"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <img src="/images/HealthMeLogo.png" alt="HealthMe" className="auth-logo" />

    {/* 3-step indicator */}
    <div className="wizard-steps">
      {STEPS.map((s, i) => {
        const isDone   = step > s.num;
        const isActive = step === s.num;
        return (
          <React.Fragment key={s.num}>
            <div className={`wizard-step${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}>
              <div className="wizard-step-circle">
                {isDone ? '✓' : s.num}
              </div>
              <span className="wizard-step-label">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`wizard-connector${step > s.num ? ' done' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>

    <h2 className="auth-title">{TITLES[step - 1]}</h2>
    <p className="auth-subtitle">
      {SUBTITLES[step - 1] === 'account' ? (
        <>Already have an account?{' '}<Link to="/login" className="auth-link">Log In</Link></>
      ) : (
        SUBTITLES[step - 1]
      )}
    </p>
  </motion.div>
);

export default SignupHeader;


