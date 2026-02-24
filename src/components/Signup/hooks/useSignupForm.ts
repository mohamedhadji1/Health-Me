import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../utils/userStore';
import { useAuth } from '../../../context/AuthContext';

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

/**
 * Encapsulates all Signup form state, validation and async submission logic.
 */
export const useSignupForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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

  const handleSubmit = async (e: React.FormEvent) => {
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
    navigate('/select-program?new=1');
  };

  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  return {
    formData,
    errors,
    isLoading,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleSubmit,
    togglePassword,
    toggleConfirmPassword,
  } as const;
};
