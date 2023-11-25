import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";

import { FormatContext } from "./context";

export function FormatProvider({ children, defaultFormats }) {
  const [isCelsius, setCelsius] = useState(defaultFormats.isCelsius);
  const [hour12, setHour12] = useState(defaultFormats.hour12);
  useEffect(() => {
    setCookie("nextjs-rq19-isCelsius", isCelsius);
    setCookie("nextjs-rq19-hour12", hour12);
  }, [isCelsius, hour12]);

  const value = { isCelsius, setCelsius, hour12, setHour12 };
  return (
    <FormatContext.Provider value={value}>
      {children}
    </FormatContext.Provider>
  );
}
