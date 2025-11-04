import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [debug, setDebug] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setDebug(null);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (data.role === "admin") {
        localStorage.setItem("adminToken", data.token);
        alert("Admin login successful");
        navigate("/admin");
      } else {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        navigate("/");
      }
    } catch (err) {
      setDebug(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Login</h3>
      <form className="card p-4 shadow mx-auto" style={{ maxWidth: 420 }} onSubmit={submit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <button className="btn btn-dark w-100">Login</button>
        <p className="text-center mt-3">No account? <a href="/register">Register</a></p>
      </form>

      {debug && (
        <div className="alert alert-danger mt-3 mx-auto" style={{ maxWidth: 520 }}>
          <strong>Debug:</strong> {typeof debug === "string" ? debug : JSON.stringify(debug)}
        </div>
      )}
    </div>
  );
};

export default Login;
