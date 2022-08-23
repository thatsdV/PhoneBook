import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouteProvider } from "./core";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouteProvider />
  </React.StrictMode>
);
