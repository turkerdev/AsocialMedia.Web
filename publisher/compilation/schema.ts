import { z } from "zod";
import { asset } from "../../object/asset";
import { destination } from "../../object/destination";

export const compilationSchema = z.object({
  assets: z.array(asset),
  destination,
});

export type CompilationInput = z.input<typeof compilationSchema>;
export type CompilationOutput = z.output<typeof compilationSchema>;
