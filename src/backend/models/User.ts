import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    firstName: {
      type: String,
      required: [true, 'Please provide a first name']
    },
    lastName: {
      type: String,
      required: [true, 'Please provide a last name']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    language: {
      type: String,
      enum: ['en', 'uz', 'ru'],
      default: 'en'
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
