import { useQuery } from "react-query";
import { loadThings } from "./api/api";
import { useDoThing } from "./api/useDoThing";
import { useUndoThing } from "./api/useUndoThing";
import { useCurrent } from "./useCurrent";

export function useThisThing(id) {
  const { data } = useQuery({
    queryKey: ["things"],
    queryFn: loadThings,
  });
  const doThing = useDoThing("things");
  const undoThing = useUndoThing("things");
  const seeThing = useCurrent((state) => state.seeThing);
  return {
    thing: data.find((t) => t.id === id),
    doThing: () => doThing(id),
    undoLastThing: () => undoThing({ id, did: "last" }),
    seeThing: () => seeThing(id),
  };
}
