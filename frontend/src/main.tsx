import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // fetched queries will be valid for 2 min
      staleTime: 1000 * 60 * 2,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  </StrictMode>
);
