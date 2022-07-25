import type { NextApiHandler } from "next";
import { compilationPublish } from "../../../publisher/compilation/publisher";
import { compilationSchema } from "../../../publisher/compilation/schema";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
};

const POST: NextApiHandler = async (req, res) => {
  const data = await compilationSchema.parseAsync(req.body);
  await compilationPublish(data);
  console.log("Compilation publish: OK");
  res.send("OK");
};

export default handler;
