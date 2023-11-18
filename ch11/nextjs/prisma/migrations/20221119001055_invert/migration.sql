/*
  Warnings:

  - You are about to drop the column `cityDataId` on the `City` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cityId` to the `CityData` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CityData" (
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
    "cityId" TEXT NOT NULL,
    "lastUpdate" INTEGER,
    CONSTRAINT "CityData_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CityData" ("cloudPercentage", "condition", "conditionDescription", "conditionId", "gmtOffset", "id", "lastUpdate", "sunrise", "sunset", "temperature", "windSpeed") SELECT "cloudPercentage", "condition", "conditionDescription", "conditionId", "gmtOffset", "id", "lastUpdate", "sunrise", "sunset", "temperature", "windSpeed" FROM "CityData";
DROP TABLE "CityData";
ALTER TABLE "new_CityData" RENAME TO "CityData";
CREATE UNIQUE INDEX "CityData_cityId_key" ON "CityData"("cityId");
CREATE TABLE "new_City" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "countryId" TEXT NOT NULL,
    CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_City" ("countryId", "id", "lat", "lng", "name") SELECT "countryId", "id", "lat", "lng", "name" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");
