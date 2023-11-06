import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

export function useUndoThing(query) {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries(query);
  const { mutate: undoThing } = useMutation(API.undoThing, {
    onSuccess,
  });
  return undoThing;
}
