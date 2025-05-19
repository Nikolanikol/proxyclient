import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

///навигация
import { BrowserRouter } from "react-router-dom";
//сетевые запросы
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootStoreProvider } from "./Store/RootStoreProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <RootStoreProvider>
        <App />
      </RootStoreProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
