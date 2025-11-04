import React, { useEffect, useState } from "react";
import api from "../utils/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then(res => setOrders(res.data)).catch(()=>alert("Failed to load orders"));
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Orders</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Artwork</th>
            <th>Order Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.title || o.artwork_title || o.artwork_name}</td>
              <td>{o.order_date}</td>
              <td>
                <span className={`badge ${o.status === "PENDING" ? "bg-warning" : o.status === "APPROVED" ? "bg-success" : "bg-secondary"}`}>
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr><td colSpan="4" className="text-center text-muted">No orders yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
