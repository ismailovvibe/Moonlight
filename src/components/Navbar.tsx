'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsLangDropdownOpen(false);
  };

  const categories = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.kino'), href: '/category/kino' },
    { name: t('nav.anime'), href: '/category/anime' },
    { name: t('nav.dorama'), href: '/category/dorama' },
    { name: t('nav.multfilm'), href: '/category/multfilm' }
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              🌙 Moonlight
            </motion.div>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {categories.map((cat) => (
              <motion.div key={cat.href} whileHover={{ scale: 1.1 }}>
                <Link
                  href={cat.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {cat.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                {i18n.language.toUpperCase()}
              </motion.button>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-lg"
                >
                  {['en', 'uz', 'ru'].map((lng) => (
                    <button
                      key={lng}
                      onClick={() => changeLanguage(lng)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {lng.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Auth */}
            {isAuthenticated && user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  {user.username}
                </motion.button>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-700 first:rounded-t-lg"
                    >
                      {t('nav.profile')}
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        {t('nav.dashboard')}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-b-lg"
                    >
                      {t('nav.logout')}
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  {t('auth.login')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
