import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchTextContextProvider from "./contexts/SearchTextContextProvider.tsx";
import ShowItemsContextProvider from "./contexts/ShowItemsContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
          <SearchTextContextProvider>
            <ShowItemsContextProvider>
              <App />
            </ShowItemsContextProvider>
          </SearchTextContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
