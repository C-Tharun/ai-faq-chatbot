import "./styles.css";
import { createRoot } from "react-dom/client";
import App from "./app";
import { Providers } from "@/providers";

const root = createRoot(document.getElementById("app")!);

root.render(
  <Providers>
    <div className="text-base text-neutral-900 antialiased transition-colors selection:bg-blue-700 selection:text-white dark:text-neutral-100">
      <App />
    </div>
  </Providers>
);
