import { PrismaClient } from "@prisma/client";
import { getCoordinateForCity, getCurrentWeatherForCoordinate } from "./api";
import slugify from "slugify";

const prisma = new PrismaClient();

const CACHE_TIME = 60 * 60; // 1 hour

export async function getCityData(countryCode, cityName) {
  const country = await prisma.country.findUnique({
    where: { code: countryCode },
    select: { name: true },
  });
  let city = await prisma.city.findUnique({
    where: { country_city: { countryCode, slug: cityName } },
    select: {
      lat: true,
      lng: true,
      name: true,
      data: true,
      id: true,
      slug: true,
      countryCode: true,
    },
  });

  const now = Math.floor(new Date().getTime() / 1000);
  if (city?.data?.lastUpdate > now - CACHE_TIME) {
    const { id, ...rest } = city;
    return { country: country.name, city: city.name, ...rest };
  }

  const getCoordinates = async () => {
    if (city) {
      return;
    }
    const cityWithCoordinates = await getCoordinateForCity(
      countryCode,
      cityName
    );
    const citySlug = slugify(cityWithCoordinates.name).toLowerCase();
    if (citySlug !== cityName) {
      // Check if we already have a city under this other name
      city = await prisma.city.findUnique({
        where: { country_city: { countryCode, slug: citySlug } },
        select: {
          lat: true,
          lng: true,
          name: true,
          slug: true,
          data: true,
          id: true,
          countryCode: true,
        },
      });
      if (city) {
        return;
      }
    }
    city = await prisma.city.create({
      data: { slug: citySlug, countryCode, ...cityWithCoordinates },
      select: {
        lat: true,
        lng: true,
        name: true,
        slug: true,
        id: true,
        countryCode: true,
      },
    });
  };

  await getCoordinates();
  const {
    city: weatherCity,
    countryCode: weatherCountry,
    ...cityData
  } = await getCurrentWeatherForCoordinate(city.lat, city.lng);
  // TODO: Maybe handle weatherCity and/or weatherCountry different from expected

  const data = await prisma.cityData.upsert({
    where: { cityId: city.id },
    update: { ...cityData, lastUpdate: now },
    create: { cityId: city.id, ...cityData, lastUpdate: now },
  });
  return { country: country.name, city: city.name, data, ...city };
}

export function getCountryData(countryCode) {
  return prisma.country.findUnique({
    where: { code: countryCode.toUpperCase() },
    select: {
      code: true,
      name: true,
      cities: {
        select: { name: true, slug: true, data: true, countryCode: true },
      },
    },
  });
}

export async function getCountryName(countryCode) {
  const { name } = await prisma.country.findUnique({
    where: { code: countryCode.toUpperCase() },
    select: { name: true },
  });
  return name;
}

const FRONTPAGE = [
  "JP/tokyo",
  "US/new-york-city",
  "FR/paris",
  "AU/sydney",
  "RU/moscow",
  "BR/sao-paulo",
  "CN/beijing",
  "ZA/johannesburg",
  "PK/karachi",
  "NG/lagos",
];

export async function getFrontpageData() {
  return Promise.all(
    FRONTPAGE.map((path) => path.split("/")).map(([cc, city]) =>
      getCityData(cc, city)
    )
  );
}
