import { useData } from "./useData";

export function useAllThings() {
  return useData((state) => state.things).map(({ id }) => id);
}
