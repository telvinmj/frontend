// src/components/PolicyholdersList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PolicyholdersList = () => {
  const [policyholders, setPolicyholders] = useState([]);

  useEffect(() => {
    fetch("/policyholders")
      .then((res) => res.json())
      .then((data) => setPolicyholders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="page-heading">Policyholders</h2>
      <div className="mb-3">
        <Link to="/policyholders/new" className="btn btn-primary">
          Add Policyholder
        </Link>
      </div>
      <div className="list-group">
        {policyholders.map((ph) => (
          <Link
            key={ph.id}
            to={`/policyholders/${ph.id}`}
            className="list-group-item list-group-item-action">
            {ph.name} - {ph.email}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PolicyholdersList;
