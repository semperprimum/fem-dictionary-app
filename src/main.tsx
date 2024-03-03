import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/state.ts";
import ThemeContextProvider from "./context/ThemeContext.tsx";
import "@fontsource-variable/inconsolata";
import "@fontsource-variable/inter";
import "@fontsource-variable/lora";
import "@fontsource-variable/lora/wght-italic.css";
import FontContextProvider from "./context/FontContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <FontContextProvider>
          <App />
        </FontContextProvider>
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>
);
