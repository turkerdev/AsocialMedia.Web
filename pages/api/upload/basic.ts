import type { NextApiHandler } from "next";
import { basicConvert } from "../../../publisher/basic/converter";
import { basicPublish } from "../../../publisher/basic/publisher";
import { basicRequestSchema } from "../../../schema/basicRequest";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
};

const POST: NextApiHandler = async (req, res) => {
  const body = await basicRequestSchema.parseAsync(req.body);
  const data = await basicConvert(body);
  await basicPublish(data);
  console.log("Basic publish: OK");
  res.send("OK");
};

export default handler;
