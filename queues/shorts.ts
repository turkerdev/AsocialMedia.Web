import { z } from "zod";
import { Asset } from "../object/asset";
import { Destination } from "../object/destination";

export const shortsQueueName = "ezupload.upload.shorts";
export const shortsSchema = z.object({
  asset: Asset,
  destination: Destination,
});
