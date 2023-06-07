const { Router } = require("express");
const {
  getAllFoods,
  addFood,
  getSingleFood,
  updateFood,
  deleteFood,
} = require("../controllers/food.controllers");

const router = Router();

router.route("/").get(getAllFoods).post(addFood);

router.route("/:id").get(getSingleFood).put(updateFood).delete(deleteFood);

module.exports = router;
