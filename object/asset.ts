import { z } from "zod";

export const asset = z.object({
  url: z.string(),
  credit: z.string().optional(),
  duration: z.string().optional(),
  start_time: z.string().optional(),
});

export type Asset = z.infer<typeof asset>;
