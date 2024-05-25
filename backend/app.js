const express = require("express");
const app = express();
const cors = require("cors");
const vehicles = require("./routes/vehicles");
//middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/list/", vehicles);

module.exports = app;
