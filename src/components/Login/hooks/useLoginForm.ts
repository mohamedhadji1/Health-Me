import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../../utils/userStore';
import { useAuth } from '../../../context/AuthContext';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

/**
 * Encapsulates all Login form state, validation and async submission logic.
 * Components only receive what they need — no raw setState exposed.
 */
export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = React.useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState<LoginErrors>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  /* ── Validation ─────────────────────────────────────────── */
  const validate = (): LoginErrors => {
    const e: LoginErrors = {};
    if (!formData.email.trim()) {
      e.email = 'Email or username is required.';
    }
    if (!formData.password) {
      e.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      e.password = 'Password must be at least 6 characters.';
    }
    return e;
  };

  /* ── Handlers ───────────────────────────────────────────── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // clear individual field error on change
    if (errors[name as keyof LoginErrors]) {
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
    const user = authenticateUser(formData.email, formData.password);
    setIsLoading(false);
    if (!user) {
      setErrors({ email: 'Invalid email/username or password.' });
      return;
    }
    login(user);
    navigate('/select-program');
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  return {
    formData,
    errors,
    isLoading,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword,
  } as const;
};
