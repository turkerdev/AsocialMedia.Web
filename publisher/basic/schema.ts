import { z } from "zod";
import { asset } from "../../object/asset";
import { destination } from "../../object/destination";

export const basicSchema = z.object({
  asset,
  destination,
});

export type BasicInput = z.input<typeof basicSchema>;
export type BasicOutput = z.output<typeof basicSchema>;
