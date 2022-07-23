import { z } from "zod";

const schema = z.object({
  RABBITMQ_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string().url(),
});

export const environment = schema.parse(process.env);
