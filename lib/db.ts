import { MongoClient } from "mongo";
import { config } from "dotenv";

const CONFIG = config();
const client = new MongoClient();

await client.connect(`mongodb://${CONFIG.MONGODB_URI}`);

interface UserSchema {
  _id: { $oid: string };
  name: string;
  role: string;
  email: string;
}

const db = client.database(CONFIG.MONGODB_DB);
const users = db.collection<UserSchema>("users");

export const DB = {
  users,
};
