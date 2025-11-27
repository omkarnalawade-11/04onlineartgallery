import React, { useEffect, useState } from "react";
import api from "../utils/api";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ artworks: 0, orders: 0, pending: 0 });

  useEffect(() => {
    Promise.all([
      api.get("/artworks"),
      api.get("/orders")
    ]).then(([aRes, oRes]) => {
      const pending = oRes.data.filter(o => o.status === "PENDING").length;
      setCounts({ artworks: aRes.data.length, orders: oRes.data.length, pending });
    }).catch(()=>{});
  }, []);

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm"><h5>Total Artworks</h5><h2>{counts.artworks}</h2></div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm"><h5>Total Orders</h5><h2>{counts.orders}</h2></div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm"><h5>Pending Orders</h5><h2>{counts.pending}</h2></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
