const { Router } = require("express");
const {
  getAllRestorans,
  addRestorans,
  getSingleRestoran,
  updateRestoran,
  deleteRestoran,
} = require("../controllers/restoran.controllers");

const router = Router();

router.route("/").get(getAllRestorans).post(addRestorans);

router
  .route("/:id")
  .get(getSingleRestoran)
  .put(updateRestoran)
  .delete(deleteRestoran);

module.exports = router;
