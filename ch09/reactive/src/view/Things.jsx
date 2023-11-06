import { useHasCurrent } from "../data";
import { AllThings } from "./AllThings";
import { SingleThing } from "./SingleThing";

export function Things() {
  const hasCurrent = useHasCurrent();
  if (hasCurrent) {
    return <SingleThing />;
  }
  return <AllThings />;
}
