import { useData } from "./useData";

export function useThing(id) {
  const {
    state: { things },
    actions: {
      seeThing,
      seeAllThings,
      doThing,
      undoThing,
      removeThing,
    },
  } = useData();
  const thing = things.find((t) => t.id === id);
  return {
    thing,
    seeAllThings,
    seeThing: () => seeThing(id),
    removeThing: () => removeThing(id),
    doThing: () => doThing(id),
    undoThing: (index) => undoThing(id, index),
    undoLastThing: () => undoThing(id, thing.done.length - 1),
  };
}
