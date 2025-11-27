import db from "../config/db.js";

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
      if (err) reject(err);
      else resolve(res[0]);
    });
  });
};

export const createUser = (name, email, password, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role],
      (err, res) => (err ? reject(err) : resolve(res))
    );
  });
};
