import { z } from "zod";

export const shortsSchema = z.object({
  asset: z.object({
    url: z.string().url(),
  }),
  destination: z.object({
    youtube: z.array(
      z.object({
        access_token: z.string(),
        refresh_token: z.string(),
      })
    ),
  }),
});

export type TShortsSchema = z.infer<typeof shortsSchema>;
