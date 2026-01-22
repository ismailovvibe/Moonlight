'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Video {
  _id: string;
  title: { en: string; uz: string; ru: string };
  category: string;
  poster_url: string;
  upload_date: string;
}

export default function ManageVideosPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchVideos();
  }, [user, router]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/videos');
      const data = await response.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId: string) => {
    try {
      const response = await fetch(`/api/videos/${videoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete video');
      }

      setVideos(videos.filter(v => v._id !== videoId));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete video');
      console.error(err);
    }
  };

  const filteredVideos = videos.filter(video => {
    const title = video.title[i18n.language as keyof typeof video.title] || video.title.en;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          className="mb-8 flex justify-between items-center"
        >
          <h1 className="text-4xl font-bold">Manage Videos</h1>
          <Link
            href="/admin/videos/new"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:from-purple-700 hover:to-pink-700 transition"
          >
            + {t('admin.addVideo')}
          </Link>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-900 text-red-200 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-800 focus:outline-none focus:border-purple-600"
          />

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
              }`}
            >
              All
            </button>
            {['kino', 'anime', 'dorama', 'multfilm'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition capitalize ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {t(`nav.${cat}`)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Videos Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-400">{t('common.loading')}</p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-400">{t('common.notFound')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-purple-600 transition"
              >
                {/* Poster */}
                <div className="relative h-48 bg-gray-800">
                  <img
                    src={video.poster_url}
                    alt={video.title.en}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Image';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 line-clamp-2">
                    {video.title[i18n.language as keyof typeof video.title] || video.title.en}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 capitalize">{video.category}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/videos/${video._id}/edit`}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition text-center"
                    >
                      {t('buttons.edit')}
                    </Link>
                    <button
                      onClick={() => setDeleteConfirm(video._id)}
                      className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                    >
                      {t('buttons.delete')}
                    </button>
                  </div>

                  {/* Delete Confirmation */}
                  {deleteConfirm === video._id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-red-900 border border-red-700 rounded-lg"
                    >
                      <p className="text-sm text-red-200 mb-2">Delete this video?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(video._id)}
                          className="flex-1 px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 px-2 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                        >
                          No
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
