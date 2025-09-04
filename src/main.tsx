import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TanStackProvider } from "../plugins/TanStackProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanStackProvider>
      <main>
        <RouterProvider router={router} />
      </main>
    </TanStackProvider>
  </StrictMode>
);
