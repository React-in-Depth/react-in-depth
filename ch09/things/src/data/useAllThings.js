import { useEffect } from "react";
import { useData } from "./useData";

export function useAllThings() {
  const loadThings = useData(({ actions }) => actions.loadThings);
  useEffect(() => void loadThings(), [loadThings]);
  return useData(({ state }) => state.things).map(({ id }) => id);
}
