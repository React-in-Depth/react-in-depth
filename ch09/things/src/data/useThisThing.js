import { useData } from "./useData";

export function useThisThing(id) {
  const thing = useData(({ state }) =>
    state.things.find((t) => t.id === id)
  );
  const { seeThing, doThisThing, undoLastThing } = useData(
    ({ actions }) => actions
  );
  return {
    thing,
    seeThing: () => seeThing(id),
    doThing: () => doThisThing(id),
    undoLastThing: () => undoLastThing(id),
  };
}
