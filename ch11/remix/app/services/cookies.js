import { redirect } from "@remix-run/node";
import { myCityCookie, temperatureCookie, timeCookie } from "~/cookies.server";

function setCookie(request, value) {
  return redirect(request.headers.get("Referer"), {
    headers: { "Set-Cookie": value },
  });
}

export async function getDefaultFormats(request) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const isCelsius = (await temperatureCookie.parse(cookieHeader)) !== false;
  const hour12 = (await timeCookie.parse(cookieHeader)) !== false;
  return { isCelsius, hour12 };
}

export async function toggleTemperature(request) {
  const { isCelsius } = await getDefaultFormats(request);
  return setCookie(request, await temperatureCookie.serialize(!isCelsius));
}

export async function toggleTime(request) {
  const { hour12 } = await getDefaultFormats(request);
  return setCookie(request, await timeCookie.serialize(!hour12));
}

export async function getMyCity(request) {
  const cookieHeader = request.headers.get("Cookie") || "";
  return (await myCityCookie.parse(cookieHeader)) || {};
}

export async function setMyCity(request, value) {
  return setCookie(request, await myCityCookie.serialize(value));
}
