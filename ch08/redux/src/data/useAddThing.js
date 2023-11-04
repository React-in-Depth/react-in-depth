import { actions } from "./store";
import { useDispatch } from "react-redux";

export function useAddThing() {
  const dispatch = useDispatch();
  return (name) => dispatch(actions.addThing(name));
}
