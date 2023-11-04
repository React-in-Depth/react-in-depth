import { useData } from "./useData";

export function useThing(id) {
  const thing = useData((state) =>
    state.things.find((t) => t.id === id)
  );
  const seeThing = useData((state) => state.seeThing);
  const seeAllThings = useData((state) => state.seeAllThings);
  const doThing = useData((state) => state.doThing);
  const undoThing = useData((state) => state.undoThing);
  const removeThing = useData((state) => state.removeThing);
  return {
    thing,
    seeThing: () => seeThing(id),
    removeThing: () => removeThing(id),
    doThing: () => doThing(id),
    seeAllThings,
    undoThing: (index) => undoThing(id, index),
    undoLastThing: () => undoThing(id, thing.done.length - 1),
  };
}
