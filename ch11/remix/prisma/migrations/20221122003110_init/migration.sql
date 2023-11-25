-- CreateTable
CREATE TABLE "Country" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "countryCode" TEXT NOT NULL,
    CONSTRAINT "City_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "cityId" TEXT NOT NULL,
    "lastUpdate" INTEGER,
    CONSTRAINT "CityData_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "City_countryCode_slug_key" ON "City"("countryCode", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "CityData_cityId_key" ON "CityData"("cityId");
