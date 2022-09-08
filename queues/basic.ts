import { z } from "zod";
import { Asset } from "../object/asset";
import { Destination } from "../object/destination";

export const basicQueueName = "ezupload.upload.basic";
export const basicSchema = z.object({
  asset: Asset,
  destination: Destination,
});
