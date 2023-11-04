import { useData } from "./useData";

export function useAllThings() {
  return useData((store) => store.data.things).map(({ id }) => id);
}
