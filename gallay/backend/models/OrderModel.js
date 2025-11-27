import db from "../config/db.js";

export const createOrder = (order) => {
  const { user_id, artwork_id, order_date, status } = order;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO orders (user_id, artwork_id, order_date, status) VALUES (?, ?, ?, ?)",
      [user_id, artwork_id, order_date, status],
      (err, res) => (err ? reject(err) : resolve(res))
    );
  });
};

export const getOrdersByUser = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT o.*, a.title 
       FROM orders o 
       JOIN artworks a ON o.artwork_id = a.id 
       WHERE o.user_id = ? ORDER BY o.id DESC`,
      [user_id],
      (err, res) => (err ? reject(err) : resolve(res))
    );
  });
};

export const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT o.*, u.name AS customer_name, a.title 
       FROM orders o 
       JOIN users u ON o.user_id = u.id 
       JOIN artworks a ON o.artwork_id = a.id 
       ORDER BY o.id DESC`,
      (err, res) => (err ? reject(err) : resolve(res))
    );
  });
};

export const updateOrderStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE orders SET status=? WHERE id=?", [status, id], (err, res) =>
      err ? reject(err) : resolve(res)
    );
  });
};
