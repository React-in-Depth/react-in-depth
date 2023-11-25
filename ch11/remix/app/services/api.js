import * as dotenv from "dotenv";
dotenv.config();

function getGeocoderUrl(countryCode, city) {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    city,
  )},${encodeURIComponent(countryCode)}&limit=1&appid=${
    process.env.OPENWEATHER_API_KEY
  }`;
}
function getReverseGeocoderUrl(lat, lng) {
  return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`;
}
function getWeatherUrl(lat, lng) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_API_KEY}`;
}

export function getCoordinateForCity(city, countryCode) {
  const url = getGeocoderUrl(city, countryCode);
  return fetch(url)
    .then((r) => r.json())
    .then((results) => results[0])
    .then((result) => {
      if (!result) {
        throw new Error("No result for", city, countryCode);
      }
      return result;
    })
    .then(({ name, lat, lon }) => ({ name, lat, lng: lon }));
}

export function getCurrentWeatherForCoordinate(lat, lng) {
  const url = getWeatherUrl(lat, lng);
  return fetch(url)
    .then((r) => r.json())
    .then((res) => ({
      conditionId: res.weather[0].id,
      condition: res.weather[0].main,
      conditionDescription: res.weather[0].description,
      temperature: res.main.temp,
      windSpeed: res.wind.speed,
      cloudPercentage: res.clouds.all,
      sunrise: res.sys.sunrise,
      sunset: res.sys.sunset,
      gmtOffset: res.timezone,
      countryCode: res.sys.country,
      city: res.name,
    }));
}

export function getCityForCoordinate(lat, lng) {
  const url = getReverseGeocoderUrl(lat, lng);
  return fetch(url)
    .then((r) => r.json())
    .then((res) =>
      Array.isArray(res)
        ? { cityName: res[0].name, countryCode: res[0].country }
        : {},
    );
}
