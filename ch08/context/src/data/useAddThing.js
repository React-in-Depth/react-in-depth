import { useData } from "./useData";

export function useAddThing() {
  return useData().actions.addThing;
}
