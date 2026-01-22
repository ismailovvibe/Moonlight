export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  language: 'en' | 'uz' | 'ru';
  favorites: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  _id: string;
  title: {
    en: string;
    uz: string;
    ru: string;
  };
  description: {
    en: string;
    uz: string;
    ru: string;
  };
  category: string;
  video_url: string;
  poster_url: string;
  language: ('en' | 'uz' | 'ru')[];
  upload_date: Date;
  added_by: string;
  views: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: {
    en: string;
    uz: string;
    ru: string;
  };
  slug: string;
  description: string;
  icon?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface VideoResponse {
  success: boolean;
  data?: Video[] | Video;
  message: string;
  total?: number;
}
