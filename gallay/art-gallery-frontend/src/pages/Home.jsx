import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="p-5 bg-light rounded-3 shadow-sm text-center">
        <h1 className="display-6">Welcome to the Art Gallery</h1>
        <p className="lead text-muted">Explore paintings, sculptures, and contemporary art from emerging and established artists.</p>
        <Link to="/gallery" className="btn btn-dark btn-lg mt-2">View Gallery</Link>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 text-center">
          <h5>🖼️ Curated Collection</h5>
          <p>Handpicked artworks with detailed provenance.</p>
        </div>
        <div className="col-md-4 text-center">
          <h5>🛒 Easy Purchase</h5>
          <p>Secure ordering and transparent pricing.</p>
        </div>
        <div className="col-md-4 text-center">
          <h5>📦 Safe Delivery</h5>
          <p>Professionally packed and shipped worldwide.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
