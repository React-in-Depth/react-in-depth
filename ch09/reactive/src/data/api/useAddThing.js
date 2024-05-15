import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as API from "./api";

export function useAddThing() {
  const queryClient = useQueryClient();
  const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: ["things"] });
  const { mutate: addThing } = useMutation({
    mutationFn: API.addThing,
    onSuccess,
  });
  return addThing;
}
