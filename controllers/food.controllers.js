const db = require("../config/connect");
const { error_handler } = require("../helpers/error_handler");
const { require_handler } = require("../helpers/require_handler");

function getAllFoods(req, res) {
  try {
    const query = "SELECT * FROM food";
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

function getSingleFood(req, res) {
  try {
    const query = "SELECT * FROM food WHERE id = ?";
    db.query(query, req.params.id, (error, result) => {
      if (error) {
        return error_handler(res);
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Food not found" });
      }
      res.json({ data: result[0] });
    });
  } catch (error) {
    error_handler(res);
  }
}

function addFood(req, res) {
  try {
    const { name } = req.body;
    if (name == undefined || name.trim() == "") {
      return require_handler(res);
    }
    const query = "INSERT INTO food(name) values(?)";
    db.query(query, name, (error, result) => {
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

function updateFood(req, res) {
  try {
    const id = req.params.id;
    const { name } = req.body;
    if (name == undefined || name.trim() == "") {
      return require_handler(res);
    }
    const query = "UPDATE food SET name = ? WHERE id = ?";
    db.query(query, [name, id], (error, result) => {
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

function deleteFood(req, res) {
  try {
    const query = "DELETE FROM food WHERE id = ?";
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
  getAllFoods,
  getSingleFood,
  addFood,
  updateFood,
  deleteFood,
};
