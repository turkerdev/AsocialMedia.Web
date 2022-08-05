import type { NextApiHandler } from "next";
import { basicQueueName, basicSchema } from "../../../queues/basic";
import { PublishToQueue } from "../../../services/queue";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
};

const POST: NextApiHandler = async ({ body }, res) => {
  await PublishToQueue(basicQueueName, basicSchema, body);
  res.send("OK");
};

export default handler;
