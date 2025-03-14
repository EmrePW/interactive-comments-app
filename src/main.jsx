import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "primeflex/primeflex.css"; // Import PrimeFlex CSS
import "primeflex/themes/primeone-light.css";
import "./customPrimeFlexTheme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
