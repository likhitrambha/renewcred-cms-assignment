import mongoose from 'mongoose';
import { env } from './environment.js';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB connected');
  } catch (error) {
  console.error("MongoDB connection failed:", error);
    if (env.nodeEnv === 'production') {
      process.exit(1);
    }
  }
};
