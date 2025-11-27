import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  if (adminOnly && !adminToken) return <Navigate to="/login" />;
  if (!adminOnly && !token) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
