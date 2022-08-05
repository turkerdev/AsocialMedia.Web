import { z } from "zod";
import { Asset } from "../object/queue/asset";
import { Destination } from "../object/queue/destination";

export const shortsQueueName = "asocialmedia.upload.shorts";
export const shortsSchema = z.object({
  asset: Asset,
  destination: Destination,
});
