// src/components/PolicyDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const PolicyDetail = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/policies/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Policy not found");
        return res.json();
      })
      .then((data) => setPolicy(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this policy and its claims?")) {
      fetch(`/policies/${id}`, { method: "DELETE" })
        .then(() => navigate("/policies"))
        .catch((err) => console.error(err));
    }
  };

  if (!policy) return <div>Loading...</div>;

  return (
    <div className="custom-card">
      <h2 className="page-heading">Policy Details</h2>
      <p>
        <strong>ID:</strong> {policy.id}
      </p>
      <p>
        <strong>Policyholder ID:</strong> {policy.policyholder_id}
      </p>
      <p>
        <strong>Coverage Amount:</strong> {policy.coverage_amount}
      </p>
      <p>
        <strong>Status:</strong> {policy.status}
      </p>
      <h3>Claims:</h3>
      <div className="list-group">
        {policy.claims &&
          policy.claims.map((claimId) => (
            <Link key={claimId} to={`/claims/${claimId}`} className="list-group-item list-group-item-action">
              Claim {claimId}
            </Link>
          ))}
      </div>
      <button onClick={handleDelete} className="btn btn-danger mt-3">
        Delete Policy
      </button>
    </div>
  );
};

export default PolicyDetail;
