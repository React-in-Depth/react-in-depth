/*
  Warnings:

  - Added the required column `lat` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `utcoffset` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "utcoffset" REAL NOT NULL,
    "countryId" TEXT NOT NULL,
    CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_City" ("countryId", "id", "name") SELECT "countryId", "id", "name" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
CREATE TABLE "new_Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Country" ("code", "id") SELECT "code", "id" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
