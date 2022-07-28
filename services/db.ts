import { prisma } from "../utils/prisma";

export class DbService {
  static async findYoutubeChannelById(platform_id: string) {
    const account = await prisma.account.findUniqueOrThrow({
      where: { platform_platform_id: { platform: "YouTube", platform_id } },
    });

    return account;
  }

  static async upsertYoutubeChannel(
    platform_id: string,
    access_token: string,
    refresh_token: string
  ) {
    await prisma.account.upsert({
      where: { platform_platform_id: { platform: "YouTube", platform_id } },
      update: { access_token, refresh_token },
      create: { platform: "YouTube", platform_id, access_token, refresh_token },
    });
  }
}
