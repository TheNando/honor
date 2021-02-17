import { Db, MongoClient } from "mongodb";

interface MongoCache {
  client: MongoClient;
  db: Db;
}

declare global {
  namespace NodeJS {
    interface Global {
      // document: Document;
      // window: Window;
      mongoCache: MongoCache;
    }
  }
}

interface User {
  _id: number;
  name: string;
  role: "admin" | "user";
}
