import { useRef } from "react";
import { Rerenderable } from "./Rerenderable";

export function NoRerenderWithPropsChange() {
  const count = useRef(0);
  return (
    <div>
      <button onClick={() => count.current++}>
        Click to re-render
      </button>
      <Rerenderable count={count.current} />
    </div>
  );
}
