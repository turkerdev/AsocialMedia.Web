import { z } from "zod";

export const compilationRequestSchema = z.object({
  assets: z.array(
    z.object({
      url: z.string().url(),
      metadata: z
        .object({
          credit: z.string().optional(),
        })
        .optional(),
    })
  ),
  destination: z.object({
    youtube: z.array(
      z.object({
        id: z.string(),
      })
    ),
  }),
});

export type TCompilationRequestSchema = z.infer<
  typeof compilationRequestSchema
>;
