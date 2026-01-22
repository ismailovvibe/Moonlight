import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      uz: { type: String, required: true },
      ru: { type: String, required: true }
    },
    description: {
      en: { type: String },
      uz: { type: String },
      ru: { type: String }
    },
    category: {
      type: String,
      enum: ['kino', 'anime', 'dorama', 'multfilm'],
      required: true
    },
    video_url: {
      type: String,
      required: [true, 'Please provide a video URL']
    },
    poster_url: {
      type: String,
      required: [true, 'Please provide a poster URL']
    },
    language: [
      {
        type: String,
        enum: ['en', 'uz', 'ru']
      }
    ],
    upload_date: {
      type: Date,
      default: Date.now
    },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
