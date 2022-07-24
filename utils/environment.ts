import { z } from "zod";

const schema = z.object({
  RABBITMQ_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string().url(),
  TWITCH_CLIENT_ID: z.string(),
  TWITCH_CLIENT_SECRET: z.string(),
  CRON_KEY: z.string(),
});

export const environment = schema.parse(process.env);
