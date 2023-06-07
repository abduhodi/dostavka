const { Router } = require("express");
const {
  getAllShippers,
  addShipper,
  getSingleShipper,
  updateShipper,
  deleteShipper,
} = require("../controllers/shipping.controllers");

const router = Router();

router.route("/").get(getAllShippers).post(addShipper);

router
  .route("/:id")
  .get(getSingleShipper)
  .put(updateShipper)
  .delete(deleteShipper);

module.exports = router;
