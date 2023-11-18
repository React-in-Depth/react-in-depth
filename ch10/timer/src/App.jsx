import "./style.css";

import { TimerManager } from "./TimerManager";

export default function App() {
  return (
    <main className="wrapper">
      <h1 className="title">Countdown</h1>
      <TimerManager />
    </main>
  );
}
