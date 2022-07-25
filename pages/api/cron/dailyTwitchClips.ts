import { NextApiHandler } from "next";
import { Asset } from "../../../object/asset";
import { compilationPublish } from "../../../publisher/compilation/publisher";
import {
  CompilationInput,
  compilationSchema,
} from "../../../publisher/compilation/schema";
import { CrawlerService } from "../../../services/crawler";
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

  const client = CrawlerService.generateTwitchClient();
  const clips = await CrawlerService.getPopularDailyClips(client);

  const assets: Asset[] = clips.map((clip) => ({
    url: clip.url,
    credit: `twitch.tv/${clip.broadcasterDisplayName}`,
  }));

  const body: CompilationInput = {
    destination: { youtube: [{ account: "UCXi8H_e2HV9VVc7YE7J99xw" }] },
    assets,
  };

  const data = await compilationSchema.parseAsync(body);
  await compilationPublish(data);
  console.log("CRON dailyTwitchClips: OK");
  res.send("OK");
};

export default handler;
