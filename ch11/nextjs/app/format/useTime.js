import { useContext } from "react";
import FormatContext from "./context";

function useTime({ gmtOffset, sunset, sunrise }) {
  const { hour12, setHour12 } = useContext(FormatContext);
  const timezonedNow = new Date(Date.now() + gmtOffset * 1000);
  const timezonedSunset = new Date((sunset + gmtOffset) * 1000);
  const timezonedSunrise = new Date((sunrise + gmtOffset) * 1000);
  const getSunEvent = () => {
    if (timezonedNow < timezonedSunrise) {
      return {
        event: "will rise",
        isNight: true,
        at: timeFormatter.format(timezonedSunrise),
      };
    }
    if (timezonedNow < timezonedSunset) {
      return {
        event: "will set",
        isNight: false,
        at: timeFormatter.format(timezonedSunset),
      };
    }
    return {
      event: "set",
      isNight: true,
      at: timeFormatter.format(timezonedSunset),
    };
  };
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: hour12 ? "numeric" : "2-digit",
    minute: "2-digit",
    hour12,
    timeZone: "Europe/London", // Hack to GMT display, because we already did timezone offset above
  });
  const month = timezonedNow.getMonth();
  const isNorthernSummer = month >= 4 && month <= 9;
  return {
    toggle: () => setHour12((v) => !v),
    isEternal: sunset === 0,
    isEternalDay: sunset === 0 && isNorthernSummer,
    isEternalNight: sunset === 0 && !isNorthernSummer,
    now: timeFormatter.format(timezonedNow),
    sun: getSunEvent(),
  };
}

export default useTime;
