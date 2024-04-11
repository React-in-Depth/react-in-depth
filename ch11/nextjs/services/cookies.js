import { getCookie } from "cookies-next";

export function getDefaultFormats(context) {
  const isCelsius = getCookie("nextjs-isCelsius", context);
  const hour12 = getCookie("nextjs-hour12", context);
  return {
    isCelsius: isCelsius !== "false",
    hour12: hour12 === "true",
  };
}
