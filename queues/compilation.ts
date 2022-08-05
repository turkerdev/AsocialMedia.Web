import { z } from "zod";
import { Asset } from "../object/queue/asset";
import { Destination } from "../object/queue/destination";

export const compilationQueueName = "asocialmedia.upload.compilation";
export const compilationSchema = z.object({
  assets: z.array(Asset),
  destination: Destination,
});
