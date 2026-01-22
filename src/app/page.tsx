'use client';

import { useEffect, useState } from 'react';
import VideoGrid from '@/components/VideoGrid';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        const data = await res.json();
        setVideos(data || []);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Banner */}
      <section className="relative h-[500px] bg-gradient-to-b from-purple-900/50 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">🌙 Moonlight</h1>
          <p className="text-xl text-gray-300">Your favorite videos, streaming now</p>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Videos</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-400">Loading videos...</p>
          </div>
        ) : videos.length > 0 ? (
          <VideoGrid videos={videos} />
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-400">No videos available</p>
          </div>
        )}
      </section>
    </div>
  );
}
