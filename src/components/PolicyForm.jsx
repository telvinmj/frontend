// src/components/PolicyForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PolicyForm = () => {
  const [formData, setFormData] = useState({
    policyholder_id: "",
    coverage_amount: "",
    status: "active"
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      policyholder_id: parseInt(formData.policyholder_id),
      coverage_amount: parseFloat(formData.coverage_amount),
      status: formData.status
    };
    fetch("/policies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/policies/${data.id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="custom-card">
      <h2 className="page-heading">Create Policy</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Policyholder ID:</label>
          <input
            className="form-control"
            name="policyholder_id"
            value={formData.policyholder_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Coverage Amount:</label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            name="coverage_amount"
            value={formData.coverage_amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Status:</label>
          <input
            className="form-control"
            name="status"
            value={formData.status}
            onChange={handleChange}
            readOnly
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PolicyForm;
