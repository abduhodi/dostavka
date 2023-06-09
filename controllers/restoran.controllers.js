const db = require("../config/connect");
const { error_handler } = require("../helpers/error_handler");
const { require_handler } = require("../helpers/require_handler");

function getAllRestorans(req, res) {
  try {
    const query = "SELECT * FROM restoran";
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

function getSingleRestoran(req, res) {
  try {
    const query = "SELECT * FROM restoran WHERE id = ?";
    db.query(query, req.params.id, (error, result) => {
      if (error) {
        return error_handler(res);
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Restoran not found" });
      }
      res.json({ data: result[0] });
    });
  } catch (error) {
    error_handler(res);
  }
}

function addRestorans(req, res) {
  try {
    const { name, address, phone } = req.body;
    if (
      [name, address, phone].some(
        (input) => input == undefined || input.trim() == ""
      )
    ) {
      return require_handler(res);
    }
    const query = "INSERT INTO restoran(name, address, phone) values(?, ?, ?)";
    db.query(query, [name, address, phone], (error, result) => {
      if (error) {
        return error_handler(res);
      }
      console.log(result);
      res.json({
        Added: result.affectedRows ? true : false,
        insertId: result.insertId,
      });
    });
  } catch (error) {
    error_handler(res);
  }
}

function updateRestoran(req, res) {
  try {
    const id = req.params.id;
    const { name, address, phone } = req.body;
    if (
      [name, address, phone].some(
        (input) => input == undefined || input.trim() == ""
      )
    ) {
      return require_handler(res);
    }
    const query =
      "UPDATE restoran SET name = ?, address = ?, phone = ? WHERE id = ?";
    db.query(query, [name, address, phone, id], (error, result) => {
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

function deleteRestoran(req, res) {
  try {
    const query = "DELETE FROM restoran WHERE id = ?";
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
  getAllRestorans,
  getSingleRestoran,
  addRestorans,
  updateRestoran,
  deleteRestoran,
};
