import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import New from "./New.tsx";
import { NextUIProvider } from "@nextui-org/react";
// import New from "./New.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <React.StrictMode>
      {/* <AdminDashboard /> */}
      <New />
    </React.StrictMode>
  </NextUIProvider>
);
