import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { worker } from "./backend";

worker.start();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
