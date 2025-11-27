import express from "express";
import cors from "cors";
import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import artworkRoutes from "./routes/artworkRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/artworks", artworkRoutes);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
