import { useData } from "./useData";

export function useAllThings() {
  return useData().state.things.map(({ id }) => id);
}
