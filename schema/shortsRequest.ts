import { z } from "zod";

export const shortsRequestSchema = z.object({
  asset: z.object({
    url: z.string().url(),
  }),
  destination: z.object({
    youtube: z.array(
      z.object({
        id: z.string(),
      })
    ),
  }),
});

export type TShortsRequestSchema = z.infer<typeof shortsRequestSchema>;
