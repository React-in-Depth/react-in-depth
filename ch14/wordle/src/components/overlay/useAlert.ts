import { useOverlay } from "./context";

export function useAlert() {
  return useOverlay().alert;
}
