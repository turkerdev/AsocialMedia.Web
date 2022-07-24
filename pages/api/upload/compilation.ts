import type { NextApiHandler } from "next";
import { compilationConvert } from "../../../publisher/compilation/converter";
import { compilationPublish } from "../../../publisher/compilation/publisher";
import { compilationRequestSchema } from "../../../schema/compilationRequest";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
};

const POST: NextApiHandler = async (req, res) => {
  const body = await compilationRequestSchema.parseAsync(req.body);
  const data = await compilationConvert(body);
  await compilationPublish(data);
  console.log("Compilation publish: OK");
  res.send("OK");
};

export default handler;
