const db = require("../config/connect");
const { error_handler } = require("../helpers/error_handler");
const { require_handler } = require("../helpers/require_handler");

function searchOrder(req, res) {
  try {
    const { food, start, end } = req.body;
    if (
      [food, start, end].some(
        (input) => input == undefined || input.trim() == ""
      )
    ) {
      return require_handler(res);
    }
    const query = `
    select f.name as food, r.name as restoran, sh.name as shipper,
    c.name as customer, c.address as customer_address o.order_time
    from orders as o join customer as c on o.customer_id = c.id
    join shipping as sh on o.shipping_id = sh.id join menu as m on o.menu_id = m.id
    join restoran as r on m.restoran_id = r.id
    join food as f on m.food_id = f.id where f.name = ? and o.order_time between(?, ?)`;
    db.query(query, [food, start, end], (error, result) => {
      if (error) {
        console.log(error);
        return error_handler(res);
      }
      res.json({ data: result });
    });
  } catch (error) {
    error_handler(res);
  }
}

module.exports = {
  searchOrder,
};
