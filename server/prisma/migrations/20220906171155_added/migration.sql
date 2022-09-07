/*
  Warnings:

  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `discordId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotifyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "spotifyId" INTEGER NOT NULL,
    "discordId" INTEGER NOT NULL,
    "name" TEXT,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_in" DATETIME,
    "url" TEXT,
    "image" TEXT
);
INSERT INTO "new_User" ("access_token", "expires_in", "image", "name", "refresh_token", "url") SELECT "access_token", "expires_in", "image", "name", "refresh_token", "url" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_spotifyId_key" ON "User"("spotifyId");
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
