'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VideoCard from './VideoCard';

interface VideoGridProps {
  category?: string;
  limit?: number;
  title?: string;
}

export default function VideoGrid({ category, limit = 12, title }: VideoGridProps) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (limit) params.append('limit', limit.toString());

        const response = await fetch(`/api/videos?${params}`);
        const data = await response.json();
        setVideos(data.data || []);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [category, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      {title && (
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-8 bg-purple-600"></span>
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <VideoCard
              id={video._id}
              title={video.title}
              poster={video.poster_url}
              rating={video.rating || 0}
              category={video.category}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
