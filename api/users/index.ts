import type { APIContext, APIHandler } from "aleph/types.d.ts";

import { DB } from "~/lib/db.ts";

export const handler: APIHandler = async ({ response }: APIContext) => {
  const users = await DB.users.find({}).toArray();
  response.json(users);
};
