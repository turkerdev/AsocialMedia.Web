import { HelixClip } from "@twurple/api/lib";
import { CategoryIds, GenerateTwitchClient } from "./twitch";

export async function MostWatchedClips(
  categories: (keyof typeof CategoryIds)[],
  startDate: string,
  endDate: string,
  limit: number = 20
) {
  const uniqueCategories = [...new Set(categories)].map((x) => CategoryIds[x]);

  const client = GenerateTwitchClient();

  const requests = uniqueCategories.map((category) =>
    client.clips.getClipsForGame(category, {
      startDate,
      endDate,
      limit,
    })
  );

  const responses = await Promise.all(requests);

  let allClips: HelixClip[] = [];
  for (const response of responses) {
    allClips.push(...response.data);
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
