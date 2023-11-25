import { getCookie } from "cookies-next";

export function getDefaultFormats(context) {
  const isCelsius = getCookie("nextjs-jrr-isCelsius", context);
  const hour12 = getCookie("nextjs-jrr-hour12", context);
  return {
    isCelsius: isCelsius !== false,
    hour12: hour12 === true,
  };
}
