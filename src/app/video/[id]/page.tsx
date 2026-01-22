'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

interface VideoDetail {
  _id: string;
  title: string;
  description: string;
  video_url: string;
  poster_url: string;
  category: string;
  rating: number;
  views: number;
}

export default function VideoPage() {
  const params = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const videoId = (params?.id as string) || '';

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos/${videoId}`);
        const data = await response.json();
        setVideo(data.data);
        setIsFavorite(user?.favorites.includes(videoId) || false);
      } catch (error) {
        console.error('Failed to fetch video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId, user]);

  const toggleFavorite = async () => {
    if (!user) return;
    // TODO: Implement favorite toggle API call
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  if (!video) {
    return <div className="flex justify-center items-center h-96">Video not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden h-96 md:h-96 lg:h-full max-h-96">
        <video
          src={video.video_url}
          controls
          className="w-full h-full"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
      </div>

      {/* Video Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-4">{video.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-purple-400 font-semibold">⭐ {video.rating.toFixed(1)}/10</span>
            <span className="text-gray-400">👁️ {video.views} views</span>
          </div>

          <p className="text-gray-300 mb-6">{video.description}</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFavorite}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              isFavorite
                ? 'bg-pink-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {isFavorite ? '❤️ ' : '🤍 '} {t('buttons.addFavorite')}
          </motion.button>
        </div>

        {/* Sidebar */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-white font-bold mb-4">Information</h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <p className="text-gray-400">Category</p>
              <p className="capitalize">{video.category}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
