import express from "express";
import { newOrder, myOrders, allOrders, setOrderStatus } from "../controllers/orderController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, newOrder);
router.get("/my", verifyToken, myOrders);
router.get("/", verifyAdmin, allOrders);
router.patch("/:id", verifyAdmin, setOrderStatus);

export default router;
