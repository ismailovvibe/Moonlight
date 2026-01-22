'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // Determine if input is email or username
      const isEmail = emailOrUsername.includes('@');
      const loginData = isEmail 
        ? { email: emailOrUsername, password }
        : { username: emailOrUsername, password };
      
      await login(emailOrUsername, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
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
        {t('auth.loginTitle')}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-900 text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">
            {t('auth.email')} {t('common.or')} {t('auth.username')}
          </label>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-600"
            placeholder={`${t('auth.email')} / ${t('auth.username')}`}
          />
          <p className="text-xs text-gray-400 mt-1">
            {t('auth.loginWithEmailOrUsername')}
          </p>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">{t('auth.password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-600"
            placeholder={t('auth.password')}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
        >
          {isLoading ? t('common.loading') : t('auth.login')}
        </motion.button>
      </form>

      <p className="text-center text-gray-400 mt-6">
        {t('auth.dontHaveAccount')}{' '}
        <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300">
          {t('auth.signup')}
        </Link>
      </p>
    </motion.div>
  );
}
