import { ThemeProvider } from "@emotion/react";
import { PropsWithChildren } from "react";
import { theme } from "./theme";

export function StyleProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
