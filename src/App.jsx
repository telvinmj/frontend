// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PolicyholdersList from "./components/PolicyholdersList";
import PolicyholderForm from "./components/PolicyholderForm";
import PolicyholderDetail from "./components/PolicyholderDetail";
import PoliciesList from "./components/PoliciesList";
import PolicyForm from "./components/PolicyForm";
import PolicyDetail from "./components/PolicyDetail";
import ClaimsList from "./components/ClaimsList";
import ClaimForm from "./components/ClaimForm";
import ClaimDetail from "./components/ClaimDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="custom-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/policyholders" element={<PolicyholdersList />} />
          <Route path="/policyholders/new" element={<PolicyholderForm />} />
          <Route path="/policyholders/:id" element={<PolicyholderDetail />} />
          <Route path="/policies" element={<PoliciesList />} />
          <Route path="/policies/new" element={<PolicyForm />} />
          <Route path="/policies/:id" element={<PolicyDetail />} />
          <Route path="/claims" element={<ClaimsList />} />
          <Route path="/claims/new" element={<ClaimForm />} />
          <Route path="/claims/:id" element={<ClaimDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
