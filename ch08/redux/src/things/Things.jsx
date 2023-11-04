import { useCurrentThing } from "../data";
import { AllThings } from "./AllThings";
import { SingleThing } from "./SingleThing";

export function Things() {
  const currentThing = useCurrentThing();
  if (currentThing) {
    return <SingleThing id={currentThing} />;
  }
  return <AllThings />;
}
