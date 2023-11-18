import { Number } from "./Number";

export function TimeDisplay({ time }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <ul className="parts">
      <Number value={minutes} label="minutes" />
      <li className="colon">:</li>
      <Number value={seconds} label="seconds" />
    </ul>
  );
}
