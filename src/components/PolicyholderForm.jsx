// src/components/PolicyholderForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PolicyholderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/policyholders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/policyholders/${data.id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="custom-card">
      <h2 className="page-heading">Create Policyholder</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Phone:</label>
          <input
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Address:</label>
          <input
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PolicyholderForm;
