-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "expires_in" DATETIME,
    "url" TEXT,
    "image" TEXT
);
INSERT INTO "new_User" ("access_token", "expires_in", "id", "name", "refresh_token") SELECT "access_token", "expires_in", "id", "name", "refresh_token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
