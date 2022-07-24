import { NextApiHandler } from "next";
import { compilationConvert } from "../../../publisher/compilation/converter";
import { compilationPublish } from "../../../publisher/compilation/publisher";
import { TCompilationRequestSchema } from "../../../schema/compilationRequest";
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

  const assets: TCompilationRequestSchema["assets"] = clips.map((clip) => ({
    url: clip.url,
    metadata: {
      credit: `twitch.tv/${clip.broadcasterDisplayName}`,
    },
  }));

  const body: TCompilationRequestSchema = {
    destination: { youtube: [{ id: "UCXi8H_e2HV9VVc7YE7J99xw" }] },
    assets,
  };

  const data = await compilationConvert(body);
  await compilationPublish(data);
  console.log("CRON dailyTwitchClips: OK");
  res.send("OK");
};

export default handler;
