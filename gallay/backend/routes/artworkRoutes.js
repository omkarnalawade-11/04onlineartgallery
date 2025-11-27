import express from "express";
import { getArtworks, getArtwork, addArtwork, editArtwork, removeArtwork } from "../controllers/artworkController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getArtworks);
router.get("/:id", getArtwork);
router.post("/", verifyAdmin, addArtwork);
router.put("/:id", verifyAdmin, editArtwork);
router.delete("/:id", verifyAdmin, removeArtwork);

export default router;
