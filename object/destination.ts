import { z } from "zod";
import { YouTube } from "./queue/platform/youtube";

export const Destination = z.object({
  youtube: z.array(YouTube),
});
