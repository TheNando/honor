import type { APIHandler } from "aleph/types.d.ts";

import { DB } from "~/lib/db.ts";

export const handler: APIHandler = async ({ response, router }) => {
  const query = {} as Record<string, string>;
  router.query.forEach((value, key) => query[key] = value);

  const found = await DB.users.count(query);
  response.status = found ? 200 : 404;
};
