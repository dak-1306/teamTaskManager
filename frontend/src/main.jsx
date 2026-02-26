import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "./app/providers.jsx";
import "./styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </StrictMode>,
);
