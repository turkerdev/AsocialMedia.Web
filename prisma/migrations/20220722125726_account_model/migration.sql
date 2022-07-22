-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('YouTube');

-- CreateTable
CREATE TABLE "Account" (
    "id" STRING NOT NULL,
    "platform" "Platform" NOT NULL,
    "access_token" STRING NOT NULL,
    "refresh_token" STRING NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("platform","id")
);
