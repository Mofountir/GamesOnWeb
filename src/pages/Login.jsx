import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useStore';
import { Mail, Lock, User, AlertCircle, Gamepad } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { t } = useTranslation();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = t('errors.required');
    }
    
    if (!isLogin) {
      if (!formData.email.trim()) {
        newErrors.email = t('errors.required');
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = t('errors.invalidEmail');
      }
    }
    
    if (!formData.password.trim()) {
      newErrors.password = t('errors.required');
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = t('errors.passwordLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login(formData.username);
      navigate('/hub');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          {/* Logo simple */}
          <div className="flex flex-col items-center mb-8">
            <Gamepad className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              GameOnWeb
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isLogin ? t('auth.login') : t('auth.signup')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border ${
                  errors.username ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder={t('auth.username')}
              />
              {errors.username && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.username}
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border ${
                    errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                  } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  placeholder={t('auth.email')}
                />
                {errors.email && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border ${
                  errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder={t('auth.password')}
              />
              {errors.password && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              {isLogin ? t('auth.login') : t('auth.signup')}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="w-full text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};