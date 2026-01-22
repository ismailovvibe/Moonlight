'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">🌙 Moonlight</h3>
            <p className="text-sm">
              Your ultimate destination for movies, anime, dramas, and cartoons.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/category/kino" className="hover:text-white transition">Movies</Link></li>
              <li><Link href="/category/anime" className="hover:text-white transition">Anime</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-bold mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/" className="hover:text-white transition">Support</Link></li>
              <li><Link href="/" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-purple-500 transition">Twitter</a>
              <a href="#" className="hover:text-purple-500 transition">Facebook</a>
              <a href="#" className="hover:text-purple-500 transition">Instagram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 Moonlight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
