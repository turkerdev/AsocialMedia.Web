import { z } from "zod";
import { FindChannelById } from "../../../services/db";

export enum categories {
  animals = 15,
  cars = 2,
  comedy = 23,
  education = 27,
  entertainment = 24,
  film = 1,
  gaming = 20,
  howto = 26,
  music = 10,
  people = 22,
  sport = 17,
  travel = 19,
  news = 25,
  tech = 28,
}

const title = z.string().default("Untitled");
const description = z.string().optional();
const tags = z.array(z.string()).optional();
const made_for_kids = z.boolean().default(false);
const privacy = z.enum(["private", "public"]).default("private");
const category = z.nativeEnum(categories).default(categories.entertainment);
const publish_at = z
  .date()
  .transform((date) => date.toISOString())
  .optional();
const video = z
  .object({
    title,
    description,
    tags,
    made_for_kids,
    privacy,
    publish_at,
    category,
  })
  .default({})
  .transform((val) => {
    return {
      ...val,
      privacy: val.publish_at ? "private" : val.privacy,
    };
  });
const account = z.string().transform(async (id) => {
  const { access_token, refresh_token } = await FindChannelById("YouTube", id);

  return {
    access_token,
    refresh_token,
  };
});

export const YouTube = z.object({
  account,
  video,
});
