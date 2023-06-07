const express = require("express");
const config = require("config");

const app = express();

app.use(express.json());

app.use("/", require("./routes/index.routes"));

const port = config.get("port");
app.listen(port, console.log(`Server is running on port ${port}`));
