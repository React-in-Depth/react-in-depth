import { useContext } from "react";
import { ToastContext } from "./context";

export function useToast() {
  return useContext(ToastContext);
}
