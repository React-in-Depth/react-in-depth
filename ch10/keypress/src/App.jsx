import { useIsKeyPressed } from "./useIsKeyPressed";

export default function App() {
  const isShiftDown = useIsKeyPressed("Shift");
  return (
    <main>
      <h2>
        is <kbd>Shift</kbd> currently pressed down?
      </h2>
      <h1>{isShiftDown ? "YES" : "NO"}</h1>
    </main>
  );
}
