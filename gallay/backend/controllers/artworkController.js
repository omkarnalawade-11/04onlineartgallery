import { getAllArtworks, getArtworkById, createArtwork, updateArtwork, deleteArtwork } from "../models/ArtworkModel.js";

export const getArtworks = async (req, res) => {
  try {
    const data = await getAllArtworks();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getArtwork = async (req, res) => {
  try {
    const data = await getArtworkById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addArtwork = async (req, res) => {
  try {
    await createArtwork(req.body);
    res.status(201).json({ message: "Artwork added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editArtwork = async (req, res) => {
  try {
    await updateArtwork(req.params.id, req.body);
    res.json({ message: "Artwork updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeArtwork = async (req, res) => {
  try {
    await deleteArtwork(req.params.id);
    res.json({ message: "Artwork deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
