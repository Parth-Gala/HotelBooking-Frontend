import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModalProvider>
      <AuthContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SearchContextProvider>
      </AuthContextProvider>
    </ModalProvider>
  </React.StrictMode>
);
