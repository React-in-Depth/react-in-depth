import { useMutation } from "@tanstack/react-query";
import * as API from "./api";

export function useDoThing(onSuccess) {
  const { mutate: doThing } = useMutation({
    mutationFn: API.doThing,
    onSuccess,
  });
  return doThing;
}
