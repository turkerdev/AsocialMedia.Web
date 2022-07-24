import { z } from "zod";

export const compilationSchema = z.object({
  assets: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
  destination: z.object({
    youtube: z.array(
      z.object({
        access_token: z.string(),
        refresh_token: z.string(),
      })
    ),
  }),
});

export type TCompilationSchema = z.infer<typeof compilationSchema>;
