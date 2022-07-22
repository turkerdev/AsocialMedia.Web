import { z } from "zod";

export const basicRequestSchema = z.object({
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

export type TBasicRequestSchema = z.infer<typeof basicRequestSchema>;
