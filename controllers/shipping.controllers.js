const db = require("../config/connect");
const { error_handler } = require("../helpers/error_handler");
const { require_handler } = require("../helpers/require_handler");

function getAllShippers(req, res) {
  try {
    const query = "SELECT * FROM shipping";
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

function getSingleShipper(req, res) {
  try {
    const query = "SELECT * FROM shipping WHERE id = ?";
    db.query(query, req.params.id, (error, result) => {
      if (error) {
        return error_handler(res);
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Shipper not found" });
      }
      res.json({ data: result[0] });
    });
  } catch (error) {
    error_handler(res);
  }
}

function addShipper(req, res) {
  try {
    const { name, phone } = req.body;
    if (
      [name, phone].some((input) => input == undefined || name.trim() == "")
    ) {
      return require_handler(res);
    }
    const query = "INSERT INTO shipping(name, phone) values(?, ?)";
    db.query(query, [name, phone], (error, result) => {
      if (error) {
        return error_handler(res);
      }
      res.json({
        Added: result.affectedRows ? true : false,
        insertId: result.insertId,
      });
    });
  } catch (error) {
    error_handler(res);
  }
}

function updateShipper(req, res) {
  try {
    const id = req.params.id;
    const { name, phone } = req.body;
    if (
      [name, phone].some((input) => input == undefined || name.trim() == "")
    ) {
      return require_handler(res);
    }
    const query = "UPDATE shipping SET name = ?, phone = ? WHERE id = ?";
    db.query(query, [name, phone, id], (error, result) => {
      if (error) {
        return error_handler(res);
      }
      res.json({
        update: result.affectedRows ? true : false,
      });
    });
  } catch (error) {
    error_handler(res);
  }
}

function deleteShipper(req, res) {
  try {
    const query = "DELETE FROM shipping WHERE id = ?";
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
  getAllShippers,
  getSingleShipper,
  addShipper,
  updateShipper,
  deleteShipper,
};
