import React from 'react';
import FormField from '../../ui/FormField';
import PasswordInput from '../../ui/PasswordInput';
import SubmitButton from '../../ui/SubmitButton';
import { LoginFormData, LoginErrors } from '../hooks/useLoginForm';

/** Arrow icon for the submit button */
const ArrowIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    style={{ width: '1rem', height: '1rem', flexShrink: 0 }}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
);

interface LoginFieldsProps {
  formData: LoginFormData;
  errors: LoginErrors;
  isLoading: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Login form fields: identifier input, password with inline forgot-password link,
 * and the animated submit button.
 */
const LoginFields = ({
  formData,
  errors,
  isLoading,
  showPassword,
  onTogglePassword,
  onChange,
}: LoginFieldsProps) => (
  <>
    {/* Email or Username */}
    <FormField
      label="Email or Username"
      htmlFor="login-email"
      error={errors.email}
      animDelay={0.2}
    >
      <input
        id="login-email"
        type="text"
        name="email"
        value={formData.email}
        onChange={onChange}
        className={`form-input${errors.email ? ' input-error' : ''}`}
        autoComplete="username"
      />
    </FormField>

    {/* Password — label row has inline Forgot Password link */}
    <FormField
      label="Password"
      htmlFor="login-password"
      error={errors.password}
      animDelay={0.3}
      labelRight={
        <a href="#forgot-password" className="forgot-link">
          Forgot Password
        </a>
      }
    >
      <PasswordInput
        id="login-password"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={onChange}
        hasError={!!errors.password}
        autoComplete="current-password"
        show={showPassword}
        onToggle={onTogglePassword}
      />
    </FormField>

    <SubmitButton
      isLoading={isLoading}
      text={
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ArrowIcon /> Log In
        </span>
      }
      loadingText="Signing In…"
      className="login-btn"
      animDelay={0.4}
    />
  </>
);

export default LoginFields;

