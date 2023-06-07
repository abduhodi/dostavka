const db = require("../config/connect");
const { error_handler } = require("../helpers/error_handler");
const { require_handler } = require("../helpers/require_handler");

function getAllMenu(req, res) {
  try {
    const query = "SELECT * FROM menu";
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

function getSingleMenu(req, res) {
  try {
    const query = "SELECT * FROM menu WHERE id = ?";
    db.query(query, req.params.id, (error, result) => {
      if (error) {
        return error_handler(res);
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "menu not found" });
      }
      res.json({ data: result[0] });
    });
  } catch (error) {
    error_handler(res);
  }
}

function addMenu(req, res) {
  try {
    const { restoran_id, food_id, price } = req.body;
    if ([restoran_id, food_id, price].some((input) => input == undefined)) {
      return require_handler(res);
    }
    const query =
      "INSERT INTO menu(restoran_id, food_id, price) values(?, ?, ?)";
    db.query(query, [restoran_id, food_id, price], (error, result) => {
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
    console.log(error);
  }
}

function updateMenu(req, res) {
  try {
    const id = req.params.id;
    const { restoran_id, food_id, price } = req.body;
    if ([restoran_id, food_id, price].some((input) => input == undefined)) {
      return require_handler(res);
    }
    const query =
      "UPDATE menu SET restoran_id = ?, food_id = ?, price = ? WHERE id = ?";
    db.query(query, [restoran_id, food_id, price, id], (error, result) => {
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

function deleteMenu(req, res) {
  try {
    const query = "DELETE FROM menu WHERE id = ?";
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
  getAllMenu,
  getSingleMenu,
  addMenu,
  updateMenu,
  deleteMenu,
};
