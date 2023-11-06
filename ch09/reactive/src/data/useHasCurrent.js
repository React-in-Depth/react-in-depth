import { useCurrent } from "./useCurrent";

export function useHasCurrent() {
  return useCurrent((state) => !!state.currentId);
}
