import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as API from "./api";

export function useAddThing() {
  const queryClient = useQueryClient();
  const { mutate: addThing } = useMutation({
    mutationFn: API.addThing,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["things"] });
      const oldValue = queryClient.getQueryData(["things"]);
      const newThing = { id: "temp", ...newData, count: 0 };
      queryClient.setQueryData(["things"], (old) => [...old, newThing]);
      return { oldValue };
    },
    onError: (error, data, { oldValue }) => {
      queryClient.setQueryData(["things"], oldValue);
    },
    onSuccess: (data, variables, { oldValue }) => {
      queryClient.setQueryData(["things"], [...oldValue, data]);
    },
  });
  return addThing;
}
