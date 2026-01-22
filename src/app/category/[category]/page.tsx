'use client';

import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import VideoGrid from '@/components/VideoGrid';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const params = useParams();
  const { t } = useTranslation();
  const category = (params?.category as string) || '';

  const categoryNames: Record<string, string> = {
    kino: t('nav.kino'),
    anime: t('nav.anime'),
    dorama: t('nav.dorama'),
    multfilm: t('nav.multfilm')
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {categoryNames[category] || category}
        </h1>
        <p className="text-gray-400">
          Discover amazing {category} content
        </p>
      </div>

      <VideoGrid category={category} limit={24} />
    </motion.div>
  );
}
