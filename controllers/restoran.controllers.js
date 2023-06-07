const db = require("../config/connect");
const { error_handler } = require("../helpers/error_handler");

function getAllRestorans(req, res) {
  const query = "SELECT * FROM restoran";
  db.query(query, (error, result) => {
    if (error) {
      return error_handler;
    }
    res.json({ data: result });
  });
}

module.exports = {
  getAllRestorans,
};
