import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/artworks").then(res => setArtworks(res.data)).catch(()=>alert("Failed to load artworks"));
  }, []);

  const filtered = artworks.filter(a => 
    (a.title?.toLowerCase().includes(q.toLowerCase()) || a.artist?.toLowerCase().includes(q.toLowerCase())) &&
    (category ? a.category === category : true)
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Gallery</h3>

      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <input className="form-control" placeholder="Search by title or artist"
                 value={q} onChange={(e)=>setQ(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option>Painting</option>
            <option>Sculpture</option>
            <option>Abstract</option>
            <option>Photography</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filtered.map((art) => (
          <div className="col-md-4 mb-4" key={art.id}>
            <div className="card h-100 shadow-sm">
              {art.image_url && <img src={art.image_url} className="card-img-top" alt={art.title} />}
              <div className="card-body">
                <h5 className="card-title mb-1">{art.title}</h5>
                <small className="text-muted">by {art.artist}</small>
                <p className="mt-2 mb-2 text-truncate">{art.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">₹{Number(art.price).toFixed(2)}</span>
                  <button className="btn btn-dark btn-sm" onClick={() => navigate(`/artwork/${art.id}`)}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-muted">No artworks found.</div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
