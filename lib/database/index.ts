import mongoose from 'mongoose';

const MONGODB_URI=process.env.MONGODB_URI;

// if we don't have a mongoose cached connection, set it to an empty object
let cached = (global as any).mongoose || { conn: null, promise: null }; // global type of mongoose

export const connectToDatabase = async () => {
  // if we already have a connection
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing.');
  }

  // if we don't have a connection, create it
  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'evently',
    bufferCommands: false,
  });

  cached.conn = await cached.promise;

  return cached.conn;
}