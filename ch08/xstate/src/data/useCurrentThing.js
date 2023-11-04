import { useData } from "./useData";

export function useCurrentThing() {
  return useData(({ context }) => context.currentThing);
}
