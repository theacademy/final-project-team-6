import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Doctor from "./Components/Doctor";
import Patient from "./Components/Patient";
import Appointments from "./Components/Appointments";
import SignIn from "./Components/LoginComponents/SignIn";
import SignUp from "./Components/LoginComponents/SignUp";
import { AuthProvider } from "./Components/Auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
