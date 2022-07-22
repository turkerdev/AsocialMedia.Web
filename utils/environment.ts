import { z } from "zod";

const schema = z.object({
  RABBITMQ_URL: z.string().url(),
});

export const environment = schema.parse(process.env);
