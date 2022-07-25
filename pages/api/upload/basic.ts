import type { NextApiHandler } from "next";
import { basicPublish } from "../../../publisher/basic/publisher";
import { basicSchema } from "../../../publisher/basic/schema";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
};

const POST: NextApiHandler = async (req, res) => {
  const data = await basicSchema.parseAsync(req.body);
  await basicPublish(data);
  console.log("Basic publish: OK");
  res.send("OK");
};

export default handler;
