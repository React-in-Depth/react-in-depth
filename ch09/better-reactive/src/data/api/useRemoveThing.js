import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

export function useRemoveThing(then) {
  const queryClient = useQueryClient();
  const { mutate: removeThing } = useMutation(API.removeThing, {
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["things"] });
      const oldValue = queryClient.getQueryData(["things"]);
      const listWithoutRemoved = oldValue.filter((t) => t.id !== id);
      queryClient.setQueryData(["things"], listWithoutRemoved);
      return { oldValue };
    },
    onError: (error, id, { oldValue }) => {
      queryClient.setQueryData(["things"], oldValue);
    },
    onSuccess: then,
    onSettled: (id) => {
      queryClient.invalidateQueries({ queryKey: ["things"] });
      queryClient.invalidateQueries({ queryKey: ["currentThing", id] });
    },
  });
  return removeThing;
}
