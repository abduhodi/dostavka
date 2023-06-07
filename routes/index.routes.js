const { Router } = require("express");

const router = Router();

router.use("/restoran", require("./restoran.routes"));

router.use("/food", require("./food.routes"));

router.use("/menu", require("./menu.routes"));

module.exports = router;
