// import type { APIRequest } from "aleph/types.d.ts";
// import { DB } from "~/lib/mongo.ts";

// export default async function handler(req: APIRequest) {
//   let count = parseInt(localStorage.getItem("count") || "0");

//   switch (req.params["action"]) {
//     case "list": {
//       const list = await DB.users.find({}).toArray();
//       req.json({ list });
//       break;
//     }
//     case "increase":
//       count++;
//       localStorage.setItem("count", count.toString());
//       req.json({ count });
//       break;
//     case "decrease":
//       count--;
//       localStorage.setItem("count", count.toString());
//       req.json({ count });
//       break;
//     default:
//       req.status(400).json({
//         error: "UnknownAction",
//         status: 400,
//         message: `undefined action '${req.params["action"]}'`,
//       });
//       break;
//   }
// }
