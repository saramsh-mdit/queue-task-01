import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { ContextProvider } from "./context/index.tsx";
import "./index.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // fetched queries will be valid for 5 min
      refetchInterval: 1000 * 60 * 5,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster toastOptions={{ duration: 4000 }} position="bottom-center" />
      </QueryClientProvider>
    </ContextProvider>
  </StrictMode>
);
