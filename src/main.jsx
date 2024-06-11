import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
// import Dashboard from "./Components/Dashboard.jsx";
import LeadDetailsComponent from "./Components/page/LeadDetailsComponent.jsx";
import Login from "./Components/Login.jsx";
import NewNav from "./Components/NewNav.jsx";

const container = document.getElementById("root"); // The root element in your HTML
const root = createRoot(container); // Create a root

root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/dashboard" element={<NewNav />} />
      <Route exact path="/lead-details" element={<LeadDetailsComponent />} />
    </Routes>
  </BrowserRouter>
);
