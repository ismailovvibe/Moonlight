'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface VideoCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number;
  category: string;
}

export default function VideoCard({ id, title, poster, rating, category }: VideoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/video/${id}`}>
        <div className="relative rounded-lg overflow-hidden cursor-pointer group bg-gray-800 h-64">
          {/* Poster Image */}
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover group-hover:brightness-50 transition duration-300"
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700"
            >
              <span className="text-2xl">▶</span>
            </motion.button>
            <p className="text-white text-sm font-semibold text-center">{title}</p>
          </motion.div>

          {/* Badge */}
          <div className="absolute top-2 right-2 bg-purple-600 px-3 py-1 rounded-full text-white text-xs font-bold">
            ⭐ {rating.toFixed(1)}
          </div>
          <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-70 px-2 py-1 rounded text-white text-xs">
            {category}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
