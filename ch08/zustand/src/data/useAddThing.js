import { useData } from "./useData";

export function useAddThing() {
  return useData((state) => state.addThing);
}
