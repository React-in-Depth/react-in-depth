import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

export function useRemoveThing(then) {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["things"] });
    queryClient.invalidateQueries({
      queryKey: ["currentThing"],
      refetchActive: false,
    });
    then();
  };
  const { mutate: removeThing } = useMutation(API.removeThing, {
    onSuccess,
  });
  return removeThing;
}
