import type { NextApiHandler } from "next";
import { z } from "zod";
import { UpsertYouTubeChannel } from "../../../services/db";
import {
  ExchangeGoogleCode,
  GenerateGoogleClient,
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
  const schema = z.object({ code: z.string() });
  const { code } = await schema.parseAsync(query);

  const { access_token, refresh_token } = await ExchangeGoogleCode(
    GenerateGoogleClient(),
    code
  );

  await UpsertYouTubeChannel(access_token, refresh_token);

  await res.revalidate("/");
  return res.redirect("/");
};

export default handler;
