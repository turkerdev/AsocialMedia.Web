import type { NextApiHandler } from "next";
import { shortsConvert } from "../../../publisher/shorts/converter";
import { shortsPublish } from "../../../publisher/shorts/publisher";
import { shortsRequestSchema } from "../../../schema/shortsRequest";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
};

const POST: NextApiHandler = async (req, res) => {
  const body = await shortsRequestSchema.parseAsync(req.body);
  const data = await shortsConvert(body);
  await shortsPublish(data);
  console.log("Shorts publish: OK");
  res.send("OK");
};

export default handler;
