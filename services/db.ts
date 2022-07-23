import { prisma } from "../utils/prisma";

export class DbService {
  static async findYoutubeChannelById(id: string) {
    const account = await prisma.account.findUniqueOrThrow({
      where: { platform_id: { platform: "YouTube", id } },
    });

    return account;
  }

  static async upsertYoutubeChannel(
    id: string,
    access_token: string,
    refresh_token: string
  ) {
    await prisma.account.upsert({
      where: { platform_id: { platform: "YouTube", id } },
      update: { access_token, refresh_token },
      create: { platform: "YouTube", id, access_token, refresh_token },
    });
  }
}
