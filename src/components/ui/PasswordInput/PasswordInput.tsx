import React from 'react';

/* ── Icon helpers ──────────────────────────────────────────── */
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.9 10.9 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/* ── Props ─────────────────────────────────────────────────── */
export interface PasswordInputProps {
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Highlights the border red when true */
  hasError?: boolean;
  autoComplete?: string;
  /** Controls visibility — manage in parent hook or state */
  show: boolean;
  onToggle: () => void;
  /** Swap the left icon (defaults to lock) */
  icon?: React.ReactNode;
}

/**
 * Password input with a left icon and a show/hide toggle button.
 * Relies on `.input-wrapper`, `.input-icon`, `.form-input`, `.form-input.padded`,
 * and `.toggle-password` CSS classes already present on the page.
 */
const PasswordInput = ({
  id,
  name,
  placeholder = '••••••••',
  value,
  onChange,
  hasError = false,
  autoComplete = 'current-password',
  show,
  onToggle,
  icon,
}: PasswordInputProps) => (
  <div className="input-wrapper">
    <span className="input-icon">
      {icon ?? <LockIcon />}
    </span>

    <input
      id={id}
      type={show ? 'text' : 'password'}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`form-input padded${hasError ? ' input-error' : ''}`}
      autoComplete={autoComplete}
    />

    <button
      type="button"
      className="toggle-password"
      onClick={onToggle}
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show ? <EyeOff /> : <EyeOpen />}
    </button>
  </div>
);

export default PasswordInput;
