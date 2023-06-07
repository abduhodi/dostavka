const { Router } = require("express");
const {
  getAllCustomers,
  addCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controllers");

const router = Router();

router.route("/").get(getAllCustomers).post(addCustomers);

router
  .route("/:id")
  .get(getSingleCustomer)
  .put(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
