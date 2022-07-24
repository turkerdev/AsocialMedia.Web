import { ApiClient, HelixClip } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import { environment } from "../utils/environment";

export class CrawlerService {
  static generateTwitchClient() {
    const authProvider = new ClientCredentialsAuthProvider(
      environment.TWITCH_CLIENT_ID,
      environment.TWITCH_CLIENT_SECRET
    );
    const client = new ApiClient({ authProvider });
    return client;
  }

  static async getPopularDailyClips(client: ApiClient) {
    const JC = "509658";
    const LOL = "21779";
    const GTAV = "32982";
    const TFT = "513143";
    const VALORANT = "516575";
    const APEX = "511224";

    const allGames = [JC, LOL, GTAV, TFT, VALORANT, APEX];

    const time = new Date();
    const now = time.toISOString();
    const yesterday = new Date(time.setDate(time.getDate() - 1)).toISOString();

    let allClips: HelixClip[] = [];

    const requests = allGames.map((game) => {
      const request = client.clips.getClipsForGame(game, {
        startDate: yesterday,
        endDate: now,
        limit: 20,
      });

      return request;
    });

    const responses = await Promise.all(requests);
    for (const response of responses) {
      allClips = [...allClips, ...response.data];
    }

    const clipsSortedByViewCount = allClips.sort((a, b) => b.views - a.views);

    const preferredDuration = 60 * 10;
    let totalDuration = 0;
    let clipsToUse: HelixClip[] = [];

    clipsSortedByViewCount.some((clip) => {
      totalDuration += clip.duration;
      clipsToUse.push(clip);
      if (totalDuration > preferredDuration) return true;
    });

    return clipsToUse;
  }
}
