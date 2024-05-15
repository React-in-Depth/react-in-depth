import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as API from "./api";

export function useDoThing(queryKey) {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries({ queryKey });
  const { mutate: doThing } = useMutation({
    mutationFn: API.doThing,
    onSuccess,
  });
  return doThing;
}
