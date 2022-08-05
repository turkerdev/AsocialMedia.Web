import moment from "moment";
import { NextApiHandler } from "next";
import { z } from "zod";
import { TAsset } from "../../../object/queue/asset";
import {
  compilationQueueName,
  compilationSchema,
} from "../../../queues/compilation";
import { MostWatchedClips } from "../../../services/crawler";
import { PublishToQueue } from "../../../services/queue";
import { environment } from "../../../utils/environment";

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
};

const POST: NextApiHandler = async (req, res) => {
  if (req.headers.authorization !== environment.CRON_KEY)
    return res.status(401).send("Not authorized");

  const now = moment().toISOString();
  const yesterday = moment().subtract(1, "days").toISOString();
  const EPISODE = moment().diff("20220805", "days") + 1;

  const clips = await MostWatchedClips(["VALORANT"], yesterday, now, 100);

  const assets: TAsset[] = clips.map((clip) => ({
    url: clip.url,
  }));

  const uniqueBroadcasters = [
    ...new Set(clips.map((x) => x.broadcasterDisplayName)),
  ];

  const title =
    `Daily VALORANT Moments #${EPISODE} | ` +
    clips
      .map((clip) => clip.title)
      .filter((title) => title.split(" ").length <= 5)
      .sort((a, b) => b.length - a.length)
      .at(0);

  const publish_at = moment.utc().startOf("day").hour(14).toDate();

  const body: z.input<typeof compilationSchema> = {
    assets,
    destination: {
      youtube: [
        {
          account: "UC6kZa6Im8QNhkWsawYsyNSw",
          title,
          publish_at,
          tags: [
            "twitch",
            "valorant",
            "clips",
            "daily",
            "moments",
            ...uniqueBroadcasters,
          ],
        },
      ],
    },
  };

  await PublishToQueue(compilationQueueName, compilationSchema, body);
  res.send("OK");
};

export default handler;
