const express = require("express");
const app = express();
const cors = require("cors");
const vehicles = require("./routes/vehicles");
const booking = require("./routes/booking");
//middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/submit/", booking);
app.use("/api/list/", vehicles);

module.exports = app;
