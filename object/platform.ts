import { z } from "zod";
import { DbService } from "../services/db";

export const youtube = z.object({
  account: z.string().transform(async (id) => {
    const { access_token, refresh_token } =
      await DbService.findYoutubeChannelById(id);

    return {
      access_token,
      refresh_token,
    };
  }),
});
