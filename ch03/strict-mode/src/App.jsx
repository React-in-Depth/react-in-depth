import { useEffect, useRef, useState } from "react";

let outsideCount = 0;
export default function App() {
  const ref = useRef(true);
  const [count, setCount] = useState(() => {
    console.log("initializing count to", outsideCount);
    return outsideCount++;
  });
  console.log("rendering with ", count);
  useEffect(() => {
    console.log("effect first time?", ref.current);
    ref.current = false;
    setCount((c) => {
      console.log("setting count from ", c, " to ", c + 1);
      return c + 1;
    });
    return () => console.log("cleaning up");
  }, []);
  useEffect(() => {
    console.log("effect every time?", count);
    return () => console.log("cleaning up every time");
  }, [count]);
  return <h1>What is the count? {count}</h1>;
}
