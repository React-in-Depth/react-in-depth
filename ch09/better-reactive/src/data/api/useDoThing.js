import { useMutation } from "react-query";
import * as API from "./api";

export function useDoThing(onSuccess) {
  const { mutate: doThing } = useMutation(API.doThing, { onSuccess });
  return doThing;
}
