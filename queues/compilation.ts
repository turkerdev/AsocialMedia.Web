import { z } from "zod";
import { Asset } from "../object/asset";
import { Destination } from "../object/destination";

export const compilationQueueName = "ezupload.upload.compilation";
export const compilationSchema = z.object({
  assets: z.array(Asset),
  destination: Destination,
});
