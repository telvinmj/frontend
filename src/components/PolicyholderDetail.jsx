// src/components/PolicyholderDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const PolicyholderDetail = () => {
  const { id } = useParams();
  const [policyholder, setPolicyholder] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/policyholders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Policyholder not found");
        return res.json();
      })
      .then((data) => {
        setPolicyholder(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`/policyholders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setPolicyholder(data);
        setEditMode(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this policyholder and all associated data?"
      )
    ) {
      fetch(`/policyholders/${id}`, { method: "DELETE" })
        .then(() => navigate("/policyholders"))
        .catch((err) => console.error(err));
    }
  };

  if (!policyholder) return <div>Loading...</div>;

  return (
    <div className="custom-card">
      <h2 className="page-heading">Policyholder Details</h2>
      {editMode ? (
        <form onSubmit={handleUpdate}>
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {policyholder.name}
          </p>
          <p>
            <strong>Email:</strong> {policyholder.email}
          </p>
          <p>
            <strong>Phone:</strong> {policyholder.phone}
          </p>
          <p>
            <strong>Address:</strong> {policyholder.address}
          </p>
          <h3>Policies:</h3>
          <ul className="list-group">
            {policyholder.policies &&
              policyholder.policies.map((policyId) => (
                <li key={policyId} className="list-group-item">
                  <Link to={`/policies/${policyId}`}>Policy {policyId}</Link>
                </li>
              ))}
          </ul>
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

export default PolicyholderDetail;
