// src/components/ClaimForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClaimForm = () => {
  const [formData, setFormData] = useState({
    policy_id: "",
    policyholder_id: "",
    description: "",
    amount: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      policy_id: parseInt(formData.policy_id),
      policyholder_id: parseInt(formData.policyholder_id),
      description: formData.description,
      amount: parseFloat(formData.amount)
    };
    fetch("/claims", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/claims/${data.id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="custom-card">
      <h2 className="page-heading">Create Claim</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Policy ID:</label>
          <input
            className="form-control"
            name="policy_id"
            value={formData.policy_id}
            onChange={handleChange}
            required
          />
        </div>
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
          <label>Description:</label>
          <input
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Amount:</label>
          <input
            className="form-control"
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount}
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

export default ClaimForm;
