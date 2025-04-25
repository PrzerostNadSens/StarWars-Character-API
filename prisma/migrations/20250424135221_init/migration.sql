-- CreateEnum
CREATE TYPE "Episode" AS ENUM ('NEWHOPE', 'EMPIRE', 'JEDI');

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "episodes" "Episode"[],
    "planet" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
