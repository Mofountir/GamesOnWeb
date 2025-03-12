import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useFormValidation = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validateField = (name, value, isLogin) => {
    if (!value.trim()) {
      return t('errors.required');
    }

    if (name === 'email' && !validateEmail(value)) {
      return t('errors.invalidEmail');
    }

    if (name === 'password' && !isLogin && value.length < 6) {
      return t('errors.passwordLength');
    }

    return null;
  };

  const validateForm = (isLogin) => {
    const newErrors = {};
    
    Object.entries(formData).forEach(([name, value]) => {
      if (isLogin && name === 'email') return;
      
      const error = validateField(name, value, isLogin);
      if (error) newErrors[name] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return {
    formData,
    errors,
    validateForm,
    handleInputChange,
    setFormData,
    setErrors
  };
};