import { useSend } from "./useSend";

export function useAddThing() {
  const send = useSend();
  return (name) => send({ type: "ADD", name });
}
