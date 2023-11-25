import { createCookie } from "@remix-run/node";

const maxAge = 86_400 * 365; // one year
export const temperatureCookie = createCookie("temperature", { maxAge });
export const timeCookie = createCookie("time", { maxAge });
export const myCityCookie = createCookie("myCity", { maxAge });
