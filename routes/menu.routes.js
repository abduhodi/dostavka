const { Router } = require("express");
const {
  getAllMenu,
  addMenu,
  getSingleMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu.controllers ");

const router = Router();

router.route("/").get(getAllMenu).post(addMenu);

router.route("/:id").get(getSingleMenu).put(updateMenu).delete(deleteMenu);

module.exports = router;
