import { useData } from "./useData";

export function useCurrentThing() {
  return useData((store) => store.data.currentThing);
}
