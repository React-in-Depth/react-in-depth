import { useContext } from "react";
import { FormatContext } from "./context";

export function useTemperature({ temperature: kelvin }) {
  const { isCelsius, setCelsius } = useContext(FormatContext);
  const value = Math.round(
    isCelsius ? kelvin - 273.15 : ((kelvin - 273.15) * 9) / 5 + 32
  );
  const unit = isCelsius ? "°C" : "°F";
  return {
    unit,
    value,
    toggle: () => setCelsius((v) => !v),
  };
}
