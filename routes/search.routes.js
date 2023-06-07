const { Router } = require("express");
const { searchOrder } = require("../controllers/search.controllers");

const router = Router();

router.route("/").post(searchOrder);

module.exports = router;
