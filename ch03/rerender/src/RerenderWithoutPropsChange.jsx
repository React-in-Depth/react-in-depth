import { useState } from "react";
import { Rerenderable } from "./Rerenderable";

export function RerenderWithoutPropsChange() {
  const [, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>
        Click to re-render
      </button>
      <Rerenderable />
    </div>
  );
}
