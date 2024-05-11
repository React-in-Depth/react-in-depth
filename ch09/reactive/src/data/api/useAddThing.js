import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

export function useAddThing() {
  const queryClient = useQueryClient();
  const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: ["things"] });
  const { mutate: addThing } = useMutation(API.addThing, { onSuccess });
  return addThing;
}
