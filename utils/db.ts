import { prisma } from "../utils/prisma";

export async function findChannelById_YT(id: string) {
  return await prisma.account.findUniqueOrThrow({
    where: {
      platform_id: {
        platform: "YouTube",
        id,
      },
    },
  });
}
