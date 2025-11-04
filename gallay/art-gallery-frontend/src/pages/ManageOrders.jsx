import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const load = () => api.get("/orders").then(res => setOrders(res.data)).catch(()=>alert("Failed to load orders"));
  useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    await api.patch(`/orders/${id}`, { status });
    load();
  };

  return (
    <div className="container mt-4">
      <h3>Manage Orders</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Artwork</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user_name || o.customer_name}</td>
              <td>{o.title || o.artwork_title}</td>
              <td>{o.order_date}</td>
              <td>
                <span className={`badge ${o.status === "PENDING" ? "bg-warning" : o.status === "APPROVED" ? "bg-success" : "bg-secondary"}`}>{o.status}</span>
              </td>
              <td>
                {o.status === "PENDING" && <button className="btn btn-primary btn-sm me-2" onClick={()=>setStatus(o.id,"APPROVED")}>Approve</button>}
                {o.status === "APPROVED" && <button className="btn btn-success btn-sm" onClick={()=>setStatus(o.id,"COMPLETED")}>Complete</button>}
              </td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan="6" className="text-center text-muted">No orders</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
