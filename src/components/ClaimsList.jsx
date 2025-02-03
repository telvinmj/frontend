// src/components/ClaimsList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClaimsList = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetch("/claims")
      .then((res) => res.json())
      .then((data) => setClaims(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="page-heading">Claims</h2>
      <div className="mb-3">
        <Link to="/claims/new" className="btn btn-primary">
          Add Claim
        </Link>
      </div>
      <div className="list-group">
        {claims.map((claim) => (
          <Link
            key={claim.id}
            to={`/claims/${claim.id}`}
            className="list-group-item list-group-item-action">
            Claim {claim.id} - Status: {claim.status}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClaimsList;
