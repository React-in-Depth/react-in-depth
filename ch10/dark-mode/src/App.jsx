import { useState, useCallback } from "react";
import { DarkModeContext } from "./DarkModeContext";
import { Page } from "./Page";

export default function App() {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = useCallback(() => setDarkMode((v) => !v), []);
  const contextValue = { isDarkMode, toggleDarkMode };
  return (
    <DarkModeContext.Provider value={contextValue}>
      <Page />
    </DarkModeContext.Provider>
  );
}
