'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EditVideoPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams() || {};
  const videoId = (params.id as string) || '';
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title_en: '',
    title_uz: '',
    title_ru: '',
    description_en: '',
    description_uz: '',
    description_ru: '',
    category: 'kino',
    video_url: '',
    poster_url: '',
    languages: ['en', 'uz', 'ru']
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
    fetchVideo();
  }, [user, router]);

  const fetchVideo = async () => {
    try {
      const response = await fetch(`/api/videos/${videoId}`);
      const video = await response.json();
      
      setFormData({
        title_en: video.title?.en || '',
        title_uz: video.title?.uz || '',
        title_ru: video.title?.ru || '',
        description_en: video.description?.en || '',
        description_uz: video.description?.uz || '',
        description_ru: video.description?.ru || '',
        category: video.category || 'kino',
        video_url: video.video_url || '',
        poster_url: video.poster_url || '',
        languages: video.language || ['en', 'uz', 'ru']
      });
    } catch (err) {
      setError('Failed to load video');
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLanguageToggle = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const videoData = {
        title: {
          en: formData.title_en,
          uz: formData.title_uz,
          ru: formData.title_ru
        },
        description: {
          en: formData.description_en,
          uz: formData.description_uz,
          ru: formData.description_ru
        },
        category: formData.category,
        video_url: formData.video_url,
        poster_url: formData.poster_url,
        language: formData.languages
      };

      const response = await fetch(`/api/videos/${videoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(videoData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update video');
      }

      router.push('/admin/videos');
    } catch (err: any) {
      setError(err.message || 'Failed to update video');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <h1 className="text-4xl font-bold">{t('admin.editVideo')}</h1>
          <Link href="/admin/videos" className="text-purple-400 hover:text-purple-300">
            ← {t('buttons.cancel')}
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

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-gray-900 border border-gray-800 rounded-lg p-8 space-y-8"
        >
          {/* Multi-language Titles */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">Titles</h3>
            <div className="space-y-4">
              {['en', 'uz', 'ru'].map((lang) => (
                <div key={lang}>
                  <label className="block text-gray-300 mb-2">
                    {t('admin.title')} ({lang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    name={`title_${lang}`}
                    value={formData[`title_${lang}` as keyof typeof formData]}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-600"
                    placeholder={`Title in ${lang}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Multi-language Descriptions */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">Descriptions</h3>
            <div className="space-y-4">
              {['en', 'uz', 'ru'].map((lang) => (
                <div key={lang}>
                  <label className="block text-gray-300 mb-2">
                    {t('admin.description')} ({lang.toUpperCase()})
                  </label>
                  <textarea
                    name={`description_${lang}`}
                    value={formData[`description_${lang}` as keyof typeof formData]}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-600"
                    placeholder={`Description in ${lang}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-300 mb-2">{t('admin.category')}</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-600"
            >
              <option value="kino">{t('nav.kino')}</option>
              <option value="anime">{t('nav.anime')}</option>
              <option value="dorama">{t('nav.dorama')}</option>
              <option value="multfilm">{t('nav.multfilm')}</option>
            </select>
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-gray-300 mb-2">{t('admin.videoUrl')}</label>
            <input
              type="url"
              name="video_url"
              value={formData.video_url}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-600"
              placeholder="https://example.com/video.mp4"
            />
          </div>

          {/* Poster URL */}
          <div>
            <label className="block text-gray-300 mb-2">{t('admin.posterUrl')}</label>
            <input
              type="url"
              name="poster_url"
              value={formData.poster_url}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-purple-600"
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          {/* Language Availability */}
          <div>
            <label className="block text-gray-300 mb-4">{t('admin.language')}</label>
            <div className="flex gap-4">
              {['en', 'uz', 'ru'].map((lang) => (
                <label key={lang} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.languages.includes(lang)}
                    onChange={() => handleLanguageToggle(lang)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-300">{lang.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('buttons.save')}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
