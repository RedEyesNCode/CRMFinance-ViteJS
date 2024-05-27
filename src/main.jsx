import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
// import Dashboard from "./Components/Dashboard.jsx";
import LeadDetailsComponent from "./Components/page/LeadDetailsComponent.jsx";
import Login from "./Components/Login.jsx";
import NewNav from "./Components/NewNav.jsx";

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        
        <Route exact path="/newnav" element={<NewNav/>} />
  
        <Route exact path="/lead-details" element={<LeadDetailsComponent />} />
      </Routes>
    </BrowserRouter>,
    document.getElementById("root")
  );

