import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global as any;

if (!cached.mongo) {
  cached.mongo = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.mongo.conn) {
    return cached.mongo.conn;
  }

  if (!cached.mongo.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.mongo.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.mongo.conn = await cached.mongo.promise;
  } catch (e) {
    cached.mongo.promise = null;
    throw e;
  }

  return cached.mongo.conn;
}

export default connectDB;
