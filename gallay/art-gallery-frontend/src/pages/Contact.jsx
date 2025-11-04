import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks! We'll reply soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <form className="card p-4 shadow mx-auto" style={{ maxWidth: 520 }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required/>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required/>
        </div>
        <div className="mb-3">
          <label>Message</label>
          <textarea rows="4" className="form-control" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} required/>
        </div>
        <button className="btn btn-dark w-100">Send</button>
      </form>
    </div>
  );
};

export default Contact;
