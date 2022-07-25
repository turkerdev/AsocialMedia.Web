import { z } from "zod";
import { youtube } from "./platform";

export const destination = z.object({
  youtube: z.array(youtube),
});
