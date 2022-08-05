import { z } from "zod";
import { Asset } from "../object/queue/asset";
import { Destination } from "../object/queue/destination";

export const basicQueueName = "asocialmedia.upload.basic";
export const basicSchema = z.object({
  asset: Asset,
  destination: Destination,
});
