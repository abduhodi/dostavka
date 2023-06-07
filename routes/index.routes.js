const { Router } = require("express");

const router = Router();

router.use("/api/restoran", require("./restoran.routes"));

module.exports = router;
