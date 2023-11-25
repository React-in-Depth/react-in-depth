import { PrismaClient } from "@prisma/client";

import countries from "./countries.mjs";

const prisma = new PrismaClient();

async function seed() {
  try {
    await Promise.all(countries.map((data) => prisma.country.create({ data })));
    console.log(`🌱  ${countries.length} countries added.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
