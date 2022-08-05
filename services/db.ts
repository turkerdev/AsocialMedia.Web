import { Platform } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { GenerateGoogleClient } from "./google";
import { GetYouTubeChannelData } from "./youtube";

export async function FindChannelById(platform: Platform, platform_id: string) {
  return await prisma.account.findUniqueOrThrow({
    where: {
      platform_platform_id: {
        platform,
        platform_id,
      },
    },
  });
}

export async function UpsertYouTubeChannel(
  access_token: string,
  refresh_token: string
) {
  const auth = GenerateGoogleClient();
  auth.setCredentials({ access_token, refresh_token });
  const { id, name, image } = await GetYouTubeChannelData(auth);

  await prisma.account.upsert({
    where: { platform_platform_id: { platform: "YouTube", platform_id: id } },
    update: { access_token, refresh_token, name, image },
    create: {
      platform: "YouTube",
      platform_id: id,
      access_token,
      refresh_token,
      name,
      image,
    },
  });
}

export async function GetAllChannels(platform?: Platform) {
  return await prisma.account.findMany({
    where: { platform },
  });
}
