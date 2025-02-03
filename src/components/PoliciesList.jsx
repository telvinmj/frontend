// src/components/PoliciesList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PoliciesList = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch("/policies")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="page-heading">Policies</h2>
      <div className="mb-3">
        <Link to="/policies/new" className="btn btn-primary">
          Add Policy
        </Link>
      </div>
      <div className="list-group">
        {policies.map((policy) => (
          <Link
            key={policy.id}
            to={`/policies/${policy.id}`}
            className="list-group-item list-group-item-action">
            Policy {policy.id} - Status: {policy.status}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PoliciesList;
