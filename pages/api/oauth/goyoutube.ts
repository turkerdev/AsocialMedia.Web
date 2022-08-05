import type { NextApiHandler } from "next";
import {
  GenerateGoogleClient,
  GenerateGoogleUrl,
} from "../../../services/google";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
};

const GET: NextApiHandler = async ({ query }, res) => {
  const url = GenerateGoogleUrl(GenerateGoogleClient());
  return res.redirect(url);
};

export default handler;
