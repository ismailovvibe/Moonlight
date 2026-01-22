'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState({ totalVideos: 0, totalUsers: 0 });

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const videosRes = await fetch('/api/videos');
        const videosData = await videosRes.json();
        setStats(prev => ({
          ...prev,
          totalVideos: Array.isArray(videosData) ? videosData.length : 0
        }));
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">{t('common.loading')}</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">📊 {t('nav.dashboard')}</h1>
          <p className="text-gray-400">Welcome back, {user.username}!</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg border border-purple-700"
          >
            <h3 className="text-gray-300 text-sm mb-2">Total Videos</h3>
            <p className="text-3xl font-bold">{stats.totalVideos}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-pink-900 to-pink-800 p-6 rounded-lg border border-pink-700"
          >
            <h3 className="text-gray-300 text-sm mb-2">Quick Actions</h3>
            <p className="text-gray-200">Manage your content</p>
          </motion.div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Video */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-purple-600 transition"
          >
            <Link href="/admin/videos/new">
              <div className="p-6 cursor-pointer">
                <div className="text-4xl mb-3">➕</div>
                <h2 className="text-xl font-bold mb-2">{t('admin.addVideo')}</h2>
                <p className="text-gray-400 text-sm">
                  Add new movies, anime, dramas, or cartoons
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Manage Videos */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-pink-600 transition"
          >
            <Link href="/admin/videos">
              <div className="p-6 cursor-pointer">
                <div className="text-4xl mb-3">🎬</div>
                <h2 className="text-xl font-bold mb-2">Manage Videos</h2>
                <p className="text-gray-400 text-sm">
                  Edit, delete, or organize your content
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
