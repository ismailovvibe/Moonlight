import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      uz: { type: String, required: true },
      ru: { type: String, required: true }
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    description: String,
    icon: String
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
