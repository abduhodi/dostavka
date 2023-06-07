const { Router } = require("express");

const router = Router();

router.use("/restoran", require("./restoran.routes"));

router.use("/food", require("./food.routes"));

router.use("/menu", require("./menu.routes"));

router.use("/shipper", require("./shipping.routes"));

router.use("/customer", require("./customer.routes"));

module.exports = router;
