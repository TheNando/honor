import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email = "", name = "" } = req.query;

  const { db } = await connectToDatabase();
  const users = await db
    .collection("users")
    .find({
      ...(email && { email }),
      ...(name && { name }),
    })
    .sort({ name: -1 })
    .limit(20)
    .toArray();
  res.json(users);
};
