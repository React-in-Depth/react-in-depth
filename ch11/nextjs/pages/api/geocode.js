import slugify from "slugify";
import { getCityForCoordinate } from "../../services/api";
import { getCountryName } from "../../services/data";

export default async function handler(req, res) {
  const { lat, lng } = req.query;
  const { cityName, countryCode } = await getCityForCoordinate(lat, lng);
  if (!cityName || !countryCode) {
    res.status(404).json({ result: "error" });
    return;
  }
  const country = await getCountryName(countryCode);
  const path = `/${slugify(countryCode)}/${slugify(cityName)}`;
  res.status(200).json({ path, country, city: cityName });
}
