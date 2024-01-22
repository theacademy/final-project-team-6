import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Doctor from "./Components/Doctor";
import Patient from "./Components/Patient";
import AppointmentPage from "./Components/AppointmentComponent/view/appointment-view";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/appointments" element={<AppointmentPage />} />

      </Routes>
    </Router>
  );
}

export default App;
