const { Router } = require("express");
const { getAllRestorans } = require("../controllers/restoran.controllers");

const router = Router();

router.route("/").get(getAllRestorans);

module.exports = router;
