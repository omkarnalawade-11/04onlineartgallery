import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ManageArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [form, setForm] = useState({ title: "", artist: "", description: "", price: "", image_url: "", category: "" });
  const [editingId, setEditingId] = useState(null);

  const load = () => api.get("/artworks").then(res => setArtworks(res.data));

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/artworks/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post("/artworks", form);
    }
    setForm({ title: "", artist: "", description: "", price: "", image_url: "", category: "" });
    load();
  };

  const editRow = (a) => {
    setEditingId(a.id);
    setForm({
      title: a.title, artist: a.artist, description: a.description,
      price: a.price, image_url: a.image_url, category: a.category
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete artwork?")) return;
    await api.delete(`/artworks/${id}`); load();
  };

  return (
    <div className="container mt-4">
      <h3>Manage Artworks</h3>
      <form className="row g-2 mt-2" onSubmit={submit}>
        <div className="col-md-3"><input className="form-control" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required/></div>
        <div className="col-md-3"><input className="form-control" placeholder="Artist" value={form.artist} onChange={(e)=>setForm({...form,artist:e.target.value})} required/></div>
        <div className="col-md-3"><input className="form-control" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} required/></div>
        <div className="col-md-3"><input className="form-control" type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} required/></div>
        <div className="col-12"><input className="form-control" placeholder="Image URL" value={form.image_url} onChange={(e)=>setForm({...form,image_url:e.target.value})}/></div>
        <div className="col-12"><textarea className="form-control" placeholder="Description" rows="2" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/></div>
        <div className="col-12"><button className="btn btn-success">{editingId ? "Update" : "Add"} Artwork</button></div>
      </form>

      <table className="table table-bordered table-striped mt-4">
        <thead className="table-dark">
          <tr><th>#</th><th>Title</th><th>Artist</th><th>Category</th><th>Price</th><th>Action</th></tr>
        </thead>
        <tbody>
          {artworks.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.title}</td>
              <td>{a.artist}</td>
              <td>{a.category}</td>
              <td>₹{Number(a.price).toFixed(2)}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={()=>editRow(a)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={()=>remove(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {artworks.length === 0 && <tr><td colSpan="6" className="text-center text-muted">No artworks yet</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default ManageArtworks;
