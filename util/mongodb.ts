import { MongoClient } from "mongodb";
import { MongoCache } from "../global";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

/**
 * Global maintains a cached connection across hot reloads in development.
 * This prevents connections growing exponentiallyduring API Route usage.
 */
export async function connectToDatabase(): Promise<MongoCache> {
  if (global.mongoCache) {
    return global.mongoCache;
  }

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  console.info("Generating new connection");

  const client = await MongoClient.connect(MONGODB_URI, opts);
  const db = client.db(MONGODB_DB);

  global.mongoCache = { client, db };
  return global.mongoCache;
}
