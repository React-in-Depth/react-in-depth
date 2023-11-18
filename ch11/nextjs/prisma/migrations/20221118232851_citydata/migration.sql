/*
  Warnings:

  - You are about to drop the column `utcoffset` on the `City` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "CityData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conditionId" INTEGER,
    "condition" TEXT,
    "conditionDescription" TEXT,
    "temperature" REAL,
    "windSpeed" REAL,
    "cloudPercentage" REAL,
    "sunrise" INTEGER,
    "sunset" INTEGER,
    "gmtOffset" INTEGER,
    "lastUpdate" INTEGER
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "countryId" TEXT NOT NULL,
    "cityDataId" TEXT,
    CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "City_cityDataId_fkey" FOREIGN KEY ("cityDataId") REFERENCES "CityData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_City" ("countryId", "id", "lat", "lng", "name") SELECT "countryId", "id", "lat", "lng", "name" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
CREATE UNIQUE INDEX "City_cityDataId_key" ON "City"("cityDataId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
