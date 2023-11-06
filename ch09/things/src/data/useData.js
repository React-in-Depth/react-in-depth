import { useContextSelector } from "use-context-selector";
import { DataContext } from "./DataContext";

export function useData(selector) {
  return useContextSelector(DataContext, selector ?? ((i) => i));
}
