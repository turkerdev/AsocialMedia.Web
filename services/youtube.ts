import type { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { z } from "zod";

export class YouTubeService {
  static async getChannelData(auth: OAuth2Client) {
    const youtube = google.youtube({ version: "v3", auth });

    const { data } = await youtube.channels.list({
      part: ["id", "snippet"],
      mine: true,
    });

    const schema = z.object({
      id: z.string(),
      snippet: z.object({
        title: z.string(),
        thumbnails: z.object({
          default: z.object({
            url: z.string(),
          }),
        }),
      }),
    });

    const channel = await schema.parseAsync(data.items?.[0]);
    return channel;
  }
}
