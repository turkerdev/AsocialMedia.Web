import { z } from "zod";
import { asset } from "../../object/asset";
import { destination } from "../../object/destination";

export const shortsSchema = z.object({
  asset,
  destination,
});

export type ShortsInput = z.input<typeof shortsSchema>;
export type ShortsOutput = z.output<typeof shortsSchema>;
