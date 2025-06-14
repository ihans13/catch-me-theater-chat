import React from "react";
import { createRoot } from "react-dom/client";
import QueryReduxProvider from "./providers/QueryReduxProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryReduxProvider>
            <App />
        </QueryReduxProvider>
    </React.StrictMode>
);