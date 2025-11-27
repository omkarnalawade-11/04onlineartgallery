import { createOrder, getOrdersByUser, getAllOrders, updateOrderStatus } from "../models/OrderModel.js";

export const newOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { artwork_id, order_date } = req.body;
    await createOrder({ user_id, artwork_id, order_date, status: "PENDING" });
    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const myOrders = async (req, res) => {
  try {
    const data = await getOrdersByUser(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const allOrders = async (req, res) => {
  try {
    const data = await getAllOrders();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setOrderStatus = async (req, res) => {
  try {
    await updateOrderStatus(req.params.id, req.body.status);
    res.json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
