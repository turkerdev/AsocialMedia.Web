import { prisma } from "../utils/prisma";

export class DbService {
  static async findYoutubeChannelById(platform_id: string) {
    return await prisma.account.findUniqueOrThrow({
      where: { platform_platform_id: { platform: "YouTube", platform_id } },
    });
  }

  static async upsertYoutubeChannel(
    platform_id: string,
    access_token: string,
    refresh_token: string,
    name: string,
    image: string
  ) {
    await prisma.account.upsert({
      where: { platform_platform_id: { platform: "YouTube", platform_id } },
      update: { access_token, refresh_token, name, image },
      create: {
        platform: "YouTube",
        platform_id,
        access_token,
        refresh_token,
        name,
        image,
      },
    });
  }

  static async getAllYoutubeChannels() {
    return await prisma.account.findMany({
      where: { platform: "YouTube" },
    });
  }
}
