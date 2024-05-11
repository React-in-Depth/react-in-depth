import { useQuery, useQueryClient } from "react-query";
import { loadThing } from "./api/api";
import { useCurrent } from "./useCurrent";
import { useDoThing } from "./api/useDoThing";
import { useUndoThing } from "./api/useUndoThing";
import { useRemoveThing } from "./api/useRemoveThing";
import { useMemo } from "react";

export function useThatThing() {
  const id = useCurrent((state) => state.currentId);
  const seeAllThings = useCurrent((state) => state.seeAllThings);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const initialData = useMemo(() => {
    const things = queryClient.getQueryData(["things"]);
    const { count, ...partialThing } = things.find((t) => t.id === id);
    return {
      ...partialThing,
      description: "...",
      done: Array.from(Array(count)).map((k, id) => ({ id })),
    };
  }, [id, queryClient]);

  const { data: thing } = useQuery({
    queryKey: ["currentThing", { id }],
    queryFn: () => loadThing(id),
    initialData,
  });

  // Handle do/undo with mutation updates
  const onSuccess = (newThing) =>
    queryClient.setQueryData(["currentThing", { id }], newThing);
  const doThing = useDoThing(onSuccess);
  const undoThing = useUndoThing(onSuccess);

  const removeThing = useRemoveThing(seeAllThings);

  return {
    thing,
    doThing: () => doThing(id),
    undoThing: (did) => undoThing({ id, did }),
    undoLastThing: () => undoThing({ id, did: "last" }),
    removeThing: () => removeThing(id),
    seeAllThings,
  };
}
