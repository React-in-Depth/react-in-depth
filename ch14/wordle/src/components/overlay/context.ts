import { createContext, ReactNode, useContext } from "react";

interface OverlayType {
  alert: (msg: string) => void;
  showDialog: (node: ReactNode) => void;
  closeDialog: () => void;
}

export const OverlayContext = createContext<OverlayType | null>(null);

export function useOverlay() {
  const overlay = useContext(OverlayContext);
  if (!overlay) {
    throw new Error("useOverlay must be used within OverlayProvider");
  }
  return overlay;
}
