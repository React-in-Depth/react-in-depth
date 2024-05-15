import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as API from "./api";

export function useUndoThing(queryKey) {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries({ queryKey });
  const { mutate: undoThing } = useMutation({
    mutationFn: API.undoThing,
    onSuccess,
  });
  return undoThing;
}
