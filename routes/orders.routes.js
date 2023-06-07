const { Router } = require("express");
const {
  getAllOrders,
  addOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controllers");

const router = Router();

router.route("/").get(getAllOrders).post(addOrder);

router.route("/:id").get(getSingleOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
