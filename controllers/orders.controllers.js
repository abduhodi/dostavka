const db = require("../config/connect");
const { error_handler } = require("../helpers/error_handler");
const { require_handler } = require("../helpers/require_handler");

function getAllOrders(req, res) {
  try {
    const query = "SELECT * FROM orders";
    db.query(query, (error, result) => {
      if (error) {
        return error_handler(res);
      }
      res.json({ data: result });
    });
  } catch (error) {
    error_handler(res);
  }
}

function getSingleOrder(req, res) {
  try {
    const query = "SELECT * FROM orders WHERE id = ?";
    db.query(query, req.params.id, (error, result) => {
      if (error) {
        return error_handler(res);
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json({ data: result[0] });
    });
  } catch (error) {
    error_handler(res);
  }
}

function addOrder(req, res) {
  try {
    const { customer_id, menu_id, shipping_id, quantity, order_time } =
      req.body;
    if (
      [customer_id, menu_id, shipping_id, quantity, order_time].some(
        (input) => input == undefined
      )
    ) {
      return require_handler(res);
    }
    const query =
      "INSERT INTO orders (customer_id, menu_id, shipping_id, quantity, order_time) values(?, ?, ?, ?, ?)";
    db.query(
      query,
      [customer_id, menu_id, shipping_id, quantity, order_time],
      (error, result) => {
        if (error) {
          return error_handler(res);
        }
        res.json({
          Added: result.affectedRows ? true : false,
          insertId: result.insertId,
        });
      }
    );
  } catch (error) {
    error_handler(res);
    console.log(error);
  }
}

function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const { customer_id, menu_id, shipping_id, quantity, order_time } =
      req.body;
    if (
      [customer_id, menu_id, shipping_id, quantity, order_time].some(
        (input) => input == undefined
      )
    ) {
      return require_handler(res);
    }
    const query =
      "UPDATE orders SET customer_id = ?, menu_id = ?, shipping_id = ?, quantity = ?, order_time = ? WHERE id = ?";
    db.query(
      query,
      [customer_id, menu_id, shipping_id, quantity, order_time, id],
      (error, result) => {
        if (error) {
          return error_handler(res);
        }
        res.json({
          update: result.affectedRows ? true : false,
        });
      }
    );
  } catch (error) {
    error_handler(res);
  }
}

function deleteOrder(req, res) {
  try {
    const query = "DELETE FROM orders WHERE id = ?";
    db.query(query, req.params.id, (error, result) => {
      if (error) {
        return error_handler(res);
      }
      res.json({ deleted: result.affectedRows ? true : false });
    });
  } catch (error) {
    error_handler(res);
  }
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  addOrder,
  updateOrder,
  deleteOrder,
};
