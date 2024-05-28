import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AdminDashboard from "./AdminDashboard.tsx";
// import New from "./New.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdminDashboard />
    {/* <New /> */}
  </React.StrictMode>
);
