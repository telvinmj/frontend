// src/components/ClaimDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ClaimDetail = () => {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/claims/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Claim not found");
        return res.json();
      })
      .then((data) => {
        setClaim(data);
        setFormData({
          amount: data.amount,
          description: data.description,
          status: data.status
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`/claims/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setClaim(data);
        setEditMode(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
      fetch(`/claims/${id}`, { method: "DELETE" })
        .then(() => navigate("/claims"))
        .catch((err) => console.error(err));
    }
  };

  if (!claim) return <div>Loading...</div>;

  return (
    <div className="custom-card">
      <h2 className="page-heading">Claim Details</h2>
      {editMode ? (
        <form onSubmit={handleUpdate}>
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
            <label>Status:</label>
            <input
              className="form-control"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>ID:</strong> {claim.id}
          </p>
          <p>
            <strong>Policy ID:</strong> {claim.policy_id}
          </p>
          <p>
            <strong>Policyholder ID:</strong> {claim.policyholder_id}
          </p>
          <p>
            <strong>Date Filed:</strong>{" "}
            {new Date(claim.date_filed).toLocaleString()}
          </p>
          <p>
            <strong>Amount:</strong> {claim.amount}
          </p>
          <p>
            <strong>Description:</strong> {claim.description}
          </p>
          <p>
            <strong>Status:</strong> {claim.status}
          </p>
          <div className="mt-3">
            <button onClick={() => setEditMode(true)} className="btn btn-warning me-2">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimDetail;
