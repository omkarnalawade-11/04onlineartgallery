import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Cdac",
  database: "art_gallery"
});

db.connect((err) => {
  if (err) console.log("Database connection failed:", err);
  else console.log("Connected to MySQL Database ✅");
});

export default db;
