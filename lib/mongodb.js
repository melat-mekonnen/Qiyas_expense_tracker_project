import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = globalThis.mongo;
if (!cached) {
  cached = { conn: null, promise: null };
  globalThis.mongo = cached;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const client = new MongoClient(uri);
    cached.promise = client.connect().then(() => ({
      client,
      db: client.db(),
    }));
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
