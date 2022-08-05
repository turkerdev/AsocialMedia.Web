import { z } from "zod";
import { FindChannelById } from "../../../services/db";

export const YouTube = z
  .object({
    account: z.string().transform(async (id) => {
      const { access_token, refresh_token } = await FindChannelById(
        "YouTube",
        id
      );

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
    category: z
      .enum([
        "animals",
        "cars",
        "comedy",
        "education",
        "entertainment",
        "film",
        "gaming",
        "howto",
        "music",
        "people",
        "sport",
        "travel",
        "news",
        "tech",
      ])
      .default("entertainment")
      .transform(async (val) => {
        const records: Record<typeof val, [string, string]> = {
          animals: ["Pets & Animals", "15"],
          cars: ["Autos & Vehicles", "2"],
          comedy: ["Comedy", "23"],
          education: ["Education", "27"],
          entertainment: ["Entertainment", "24"],
          film: ["Film & Animation", "1"],
          gaming: ["Gaming", "20"],
          howto: ["Howto & Style", "26"],
          music: ["Music", "10"],
          people: ["People & Blogs", "22"],
          sport: ["Sports", "17"],
          travel: ["Travel & Events", "19"],
          news: ["News & Politics", "25"],
          tech: ["Science & Technology", "28"],
        };

        return records[val].at(1);
      }),
  })
  .transform((val) => {
    return {
      ...val,
      privacy: val.publish_at ? "private" : val.privacy,
    };
  });
