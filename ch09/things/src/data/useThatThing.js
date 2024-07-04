import { useEffect } from "react";
import { useData } from "./useData";

export function useThatThing() {
  const id = useData(({ state }) => state.currentId);
  const thing = useData(({ state }) => state.currentThing);
  const {
    seeAllThings,
    doThatThing,
    undoThatThing,
    removeThing,
    loadThing,
  } = useData(({ actions }) => actions);
  useEffect(() => void loadThing(id), [id, loadThing]);
  return {
    thing,
    removeThing: () => removeThing(id),
    doThing: () => doThatThing(id),
    seeAllThings,
    undoThing: (did) => undoThatThing(id, did),
    undoLastThing: () => undoThatThing(id, "last"),
  };
}
