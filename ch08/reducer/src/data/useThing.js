import { useData } from "./useData";

export function useThing(id) {
  const thing = useData(({ state }) =>
    state.things.find((t) => t.id === id)
  );
  const { seeThing, seeAllThings, doThing, undoThing, removeThing } =
    useData(({ actions }) => actions);
  return {
    thing,
    seeAllThings,
    seeThing: () => seeThing(id),
    removeThing: () => removeThing(id),
    doThing: () => doThing(id),
    undoThing: (index) => undoThing({ id, index }),
    undoLastThing: () =>
      undoThing({ id, index: thing.done.length - 1 }),
  };
}
