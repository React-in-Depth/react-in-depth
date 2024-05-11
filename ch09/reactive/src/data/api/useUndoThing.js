import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

export function useUndoThing(queryKey) {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries({ queryKey });
  const { mutate: undoThing } = useMutation(API.undoThing, {
    onSuccess,
  });
  return undoThing;
}
