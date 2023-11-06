import { useMutation } from "react-query";
import * as API from "./api";

export function useUndoThing(onSuccess) {
  const { mutate: undoThing } = useMutation(API.undoThing, {
    onSuccess,
  });
  return undoThing;
}
