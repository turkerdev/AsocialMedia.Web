import { z } from "zod";
import { DbService } from "../services/db";

export const youtube = z
  .object({
    account: z.string().transform(async (id) => {
      const { access_token, refresh_token } =
        await DbService.findYoutubeChannelById(id);

      return {
        access_token,
        refresh_token,
      };
    }),
    title: z.string().default("Untitled"),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    made_for_kids: z.boolean().default(false),
    privacy: z.enum(["private", "public"]).default("private"),
    publish_at: z
      .date()
      .transform((date) => date.toISOString())
      .optional(),
  })
  .transform((val) => {
    return {
      ...val,
      privacy: val.publish_at ? "private" : val.privacy,
    };
  });
