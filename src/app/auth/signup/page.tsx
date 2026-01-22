'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function SignupPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(formData);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700"
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        {t('auth.signupTitle')}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-900 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">{t('auth.firstName')}</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-600"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">{t('auth.lastName')}</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">{t('auth.username')}</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-600"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">{t('auth.email')}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-600"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">{t('auth.password')}</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-600"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">{t('auth.confirmPassword')}</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-600"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
        >
          {isLoading ? t('common.loading') : t('auth.signup')}
        </motion.button>
      </form>

      <p className="text-center text-gray-400 mt-6">
        {t('auth.alreadyHaveAccount')}{' '}
        <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
          {t('auth.login')}
        </Link>
      </p>
    </motion.div>
  );
}
