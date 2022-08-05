import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { z } from "zod";

export async function GetYouTubeChannelData(auth: OAuth2Client) {
  const service = google.youtube({ version: "v3", auth });

  const { data } = await service.channels.list({
    part: ["id", "snippet"],
    mine: true,
  });

  const schema = z
    .object({
      id: z.string(),
      snippet: z.object({
        title: z.string(),
        thumbnails: z.object({
          default: z.object({
            url: z.string(),
          }),
        }),
      }),
    })
    .transform((val) => {
      return {
        id: val.id,
        name: val.snippet.title,
        image: val.snippet.thumbnails.default.url,
      };
    });

  return await schema.parseAsync(data.items?.[0]);
}
