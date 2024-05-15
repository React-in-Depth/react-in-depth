import { useMutation } from "@tanstack/react-query";
import * as API from "./api";

export function useUndoThing(onSuccess) {
  const { mutate: undoThing } = useMutation({
    mutationFn: API.undoThing,
    onSuccess,
  });
  return undoThing;
}
