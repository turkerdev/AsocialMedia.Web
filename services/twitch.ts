import { ApiClient } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import { environment } from "../utils/environment";

export const CategoryIds = {
  JC: "509658",
  LOL: "21779",
  GTAV: "32982",
  TFT: "513143",
  VALORANT: "516575",
  APEX: "511224",
} as const;

export function GenerateTwitchClient() {
  const authProvider = new ClientCredentialsAuthProvider(
    environment.TWITCH_CLIENT_ID,
    environment.TWITCH_CLIENT_SECRET
  );

  return new ApiClient({ authProvider });
}
