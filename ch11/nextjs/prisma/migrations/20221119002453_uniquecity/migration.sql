/*
  Warnings:

  - A unique constraint covering the columns `[countryId,lowerName]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "City_countryId_lowerName_key" ON "City"("countryId", "lowerName");
