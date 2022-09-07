-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "spotify_id" TEXT NOT NULL,
    "discord_id" TEXT NOT NULL,
    "name" TEXT,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_in" DATETIME,
    "url" TEXT,
    "image" TEXT
);
INSERT INTO "new_User" ("access_token", "discord_id", "expires_in", "image", "name", "refresh_token", "spotify_id", "url") SELECT "access_token", "discord_id", "expires_in", "image", "name", "refresh_token", "spotify_id", "url" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_spotify_id_key" ON "User"("spotify_id");
CREATE UNIQUE INDEX "User_discord_id_key" ON "User"("discord_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
