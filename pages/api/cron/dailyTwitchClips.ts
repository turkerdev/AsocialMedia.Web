import moment from "moment";
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

  const broadcasters = [...new Set(clips.map((x) => x.broadcasterDisplayName))];
  const title = clips
    .map((clip) => clip.title)
    .filter((title) => title.split(" ").length >= 5)[0];
  const publish_at = moment.utc().startOf("day").hour(13).toDate();

  const body: CompilationInput = {
    assets,
    destination: {
      youtube: [
        {
          account: "UCXi8H_e2HV9VVc7YE7J99xw",
          title,
          publish_at,
          tags: ["twitch", "clips", "daily", ...broadcasters],
        },
      ],
    },
  };

  const data = await compilationSchema.parseAsync(body);
  await compilationPublish(data);
  console.log("CRON dailyTwitchClips: OK");
  res.send("OK");
};

export default handler;
