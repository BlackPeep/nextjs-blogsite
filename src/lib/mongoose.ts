import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

declare global {
  var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

const globalCache = globalThis.mongoose || {
  conn: null,
  promise: null,
};

globalThis.mongoose = globalCache;

export async function connectToDB(): Promise<Mongoose> {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "nextjs-blog",
    });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}
