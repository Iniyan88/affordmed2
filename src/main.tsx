import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import New from "./New.tsx";
// import New from "./New.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <AdminDashboard /> */} // For the api
    "https://hub.dummyapis.com/employee?noofRecords=1000 "
    <New /> //For the api "https://tinyurl.com/dummyapi"
  </React.StrictMode>
);
