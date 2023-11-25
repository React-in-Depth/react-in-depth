import { json, Response } from "@remix-run/node";
import slugify from "slugify";

import { getCityForCoordinate } from "~/services/api";
import { getCountryName } from "~/services/data";

export async function loader({ request }) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lng = url.searchParams.get("lng");
  const { cityName, countryCode } = await getCityForCoordinate(lat, lng);
  if (!cityName || !countryCode) {
    throw new Response("Not Found", { status: 404 });
  }
  const country = await getCountryName(countryCode);
  const path = `/${slugify(countryCode)}/${slugify(cityName)}`;
  return json({ path, country, city: cityName });
}
