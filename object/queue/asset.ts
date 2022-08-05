import { z } from "zod";

export const Asset = z.object({
  url: z.string(),
  credit: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
});

export type TAsset = z.infer<typeof Asset>;
