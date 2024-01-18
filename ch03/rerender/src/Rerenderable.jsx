import { useEffect } from "react";
import { useRef } from "react";

export function Rerenderable() {
  const isFirst = useRef(true);
  useEffect(() => {
    isFirst.current = false;
  }, []);
  const style = { color: isFirst.current ? "red" : "blue" };
  const text = isFirst.current ? "First render" : "Not first render";
  return <p style={style}>{text}</p>;
}
