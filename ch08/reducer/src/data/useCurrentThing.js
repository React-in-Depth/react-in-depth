import { useData } from "./useData";

export function useCurrentThing() {
  return useData(({ state }) => state.currentThing);
}
