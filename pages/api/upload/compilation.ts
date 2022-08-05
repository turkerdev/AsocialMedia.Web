import type { NextApiHandler } from "next";
import {
  compilationQueueName,
  compilationSchema,
} from "../../../queues/compilation";
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
  await PublishToQueue(compilationQueueName, compilationSchema, body);
  res.send("OK");
};

export default handler;
