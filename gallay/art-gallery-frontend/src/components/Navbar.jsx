import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">🎨 Art Gallery</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/gallery">Gallery</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            {token && <li className="nav-item"><Link className="nav-link" to="/my-orders">My Orders</Link></li>}
            {adminToken && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/manage-artworks">Manage Artworks</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/manage-orders">Manage Orders</Link></li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!token && !adminToken ? (
              <>
                <li className="nav-item"><Link className="btn btn-light btn-sm me-2" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="btn btn-outline-light btn-sm" to="/register">Sign Up</Link></li>
              </>
            ) : (
              <li className="nav-item"><button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
