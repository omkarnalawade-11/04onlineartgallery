import db from "../config/db.js";

export const getAllArtworks = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM artworks ORDER BY id DESC", (err, res) =>
      err ? reject(err) : resolve(res)
    );
  });
};

export const getArtworkById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM artworks WHERE id = ?", [id], (err, res) =>
      err ? reject(err) : resolve(res[0])
    );
  });
};

export const createArtwork = (art) => {
  const { title, artist, description, price, image_url, category } = art;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO artworks (title, artist, description, price, image_url, category) VALUES (?, ?, ?, ?, ?, ?)",
      [title, artist, description, price, image_url, category],
      (err, res) => (err ? reject(err) : resolve(res))
    );
  });
};

export const updateArtwork = (id, art) => {
  const { title, artist, description, price, image_url, category } = art;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE artworks SET title=?, artist=?, description=?, price=?, image_url=?, category=? WHERE id=?",
      [title, artist, description, price, image_url, category, id],
      (err, res) => (err ? reject(err) : resolve(res))
    );
  });
};

export const deleteArtwork = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM artworks WHERE id = ?", [id], (err, res) =>
      err ? reject(err) : resolve(res)
    );
  });
};
