/*
  Warnings:

  - You are about to drop the column `countryId` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `lowerName` on the `City` table. All the data in the column will be lost.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Country` table. All the data in the column will be lost.
  - Added the required column `countryCode` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "countryCode" TEXT NOT NULL,
    CONSTRAINT "City_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_City" ("id", "lat", "lng", "name") SELECT "id", "lat", "lng", "name" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
CREATE UNIQUE INDEX "City_countryCode_slug_key" ON "City"("countryCode", "slug");
CREATE TABLE "new_Country" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Country" ("code", "name") SELECT "code", "name" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
