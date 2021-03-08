import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { name },
  } = req;
  const { db } = await connectToDatabase();
  const users = await db.collection("users").find({ name }).toArray();
  res.json(users);
};
