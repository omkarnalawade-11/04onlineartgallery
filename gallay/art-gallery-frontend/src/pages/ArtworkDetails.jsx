import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const ArtworkDetails = () => {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [debug, setDebug] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/artworks/${id}`).then(res => setArt(res.data)).catch(()=>alert("Failed to load artwork"));
  }, [id]);

  const order = async () => {
    setDebug(null);
    if (!token) { alert("Please login as customer to order"); navigate("/login"); return; }
    try {
      await api.post("/orders", { artwork_id: id, order_date: new Date().toISOString().slice(0,10) });
      alert("Order placed. Pending approval.");
      navigate("/my-orders");
    } catch (err) {
      setDebug(err.response?.data || err.message);
      alert("Order failed");
    }
  };

  if (!art) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-6">
          {art.image_url && <img src={art.image_url} alt={art.title} className="img-fluid rounded shadow-sm" />}
        </div>
        <div className="col-md-6">
          <h3>{art.title}</h3>
          <p className="text-muted">by {art.artist} · {art.category}</p>
          <p>{art.description}</p>
          <h4 className="mb-3">₹{Number(art.price).toFixed(2)}</h4>
          <button className="btn btn-dark" onClick={order}>Order</button>
          {debug && (
            <div className="alert alert-danger mt-3">
              <strong>Debug:</strong> {typeof debug === "string" ? debug : JSON.stringify(debug)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
