import { useData } from "./useData";

export function useAllThings() {
  return useData((state) => state.context.things).map(({ id }) => id);
}
