import { getCookie } from "cookies-next";

export function getDefaultFormats(context) {
  return {
    isCelsius: getCookie("nextjs-rq19-isCelsius", context) !== false,
    hour12: getCookie("nextjs-rq19-hour12", context) === true,
  };
}
