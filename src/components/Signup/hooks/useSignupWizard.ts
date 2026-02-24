import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../utils/userStore';
import { useAuth } from '../../../context/AuthContext';

/* ── Form types (kept from useSignupForm) ────────────────── */
export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  sendEmailUpdates: boolean;
}

export interface SignupErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

/* ── Macro results carried from step 2 → 3 ──────────────── */
export interface MacroResults {
  bmr: number;
  tdee: number;
  target: number;
  protein: number;
  carbs: number;
  fat: number;
  goal: string; // 'cut' | 'maintain' | 'bulk'
}

/**
 * Manages the full 3-step signup wizard state:
 *   1 → Account form
 *   2 → Macro calculator
 *   3 → Choose plan
 */
export const useSignupWizard = () => {
  const navigate = useNavigate();
  const { login, user, refreshUser } = useAuth();

  /* ── Wizard step ─────────────────────────────────────────── */
  const [step, setStep] = React.useState<1 | 2 | 3>(1);

  /* ── Step 1: form data ───────────────────────────────────── */
  const [formData, setFormData] = React.useState<SignupFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    sendEmailUpdates: false,
  });
  const [errors, setErrors] = React.useState<SignupErrors>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  /* ── Step 2: macro results ───────────────────────────────── */
  const [macroResults, setMacroResults] = React.useState<MacroResults | null>(null);

  /* ── Validation ─────────────────────────────────────────── */
  const validate = (): SignupErrors => {
    const e: SignupErrors = {};
    if (!formData.username.trim()) e.username = 'Username is required.';
    if (!formData.email) {
      e.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!formData.password) {
      e.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      e.password = 'Password must be at least 8 characters.';
    }
    if (!formData.confirmPassword) {
      e.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      e.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.agreeToTerms) e.agreeToTerms = 'You must agree to the terms to continue.';
    return e;
  };

  /* ── Handlers ───────────────────────────────────────────── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value,
    }));
    if (errors[name as keyof SignupErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  /** Step 1 submit: register the user and advance to step 2 */
  const handleSubmitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const result = registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      goal: 'general',
    });
    setIsLoading(false);
    if ('error' in result) {
      setErrors({ email: result.error });
      return;
    }
    login(result);
    setStep(2);
  };

  /** Step 2: save macro results (or null = skipped) and advance to step 3 */
  const handleContinueFromMacros = (results: MacroResults | null) => {
    setMacroResults(results);
    setStep(3);
  };

  /** Step 3: save the chosen goal and navigate to dashboard */
  const handleSelectProgram = (programKey: string) => {
    const currentUser = user;
    if (!currentUser) return;
    refreshUser({ ...currentUser, goal: programKey });
    navigate('/dashboard');
  };

  const goBackTo = (s: 1 | 2 | 3) => setStep(s);

  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  return {
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
  } as const;
};
