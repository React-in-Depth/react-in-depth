import { useState } from "react";

import FormatContext from "./context";

function FormatProvider({ children, defaultFormats }) {
  const [isCelsius, setCelsius] = useState(defaultFormats.isCelsius);
  const [hour12, setHour12] = useState(defaultFormats.hour12);

  const value = { isCelsius, setCelsius, hour12, setHour12 };

  return (
    <FormatContext.Provider value={value}>{children}</FormatContext.Provider>
  );
}

export default FormatProvider;
