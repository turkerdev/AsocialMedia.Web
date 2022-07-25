import type { NextApiHandler } from "next";
import { shortsPublish } from "../../../publisher/shorts/publisher";
import { shortsSchema } from "../../../publisher/shorts/schema";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
};

const POST: NextApiHandler = async (req, res) => {
  const data = await shortsSchema.parseAsync(req.body);
  await shortsPublish(data);
  console.log("Shorts publish: OK");
  res.send("OK");
};

export default handler;
