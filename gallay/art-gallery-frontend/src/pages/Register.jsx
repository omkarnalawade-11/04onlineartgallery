import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const [debug, setDebug] = useState(null);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  const submit = async (e) => {
    e.preventDefault(); setDebug(null);
    if (!emailRegex.test(form.email) || !passwordRegex.test(form.password)) {
      alert("Invalid email or password format"); return;
    }
    try {
      await api.post("/auth/register", form);
      alert(`${form.role} registered successfully`);
      navigate("/login");
    } catch (err) {
      setDebug(err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Register</h3>
      <form className="card p-4 shadow mx-auto" style={{ maxWidth: 420 }} onSubmit={submit}>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required/>
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select className="form-select" value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-success w-100">Create Account</button>
      </form>

      {debug && (
        <div className="alert alert-danger mt-3 mx-auto" style={{ maxWidth: 520 }}>
          <strong>Debug:</strong> {typeof debug === "string" ? debug : JSON.stringify(debug)}
        </div>
      )}
    </div>
  );
};

export default Register;
