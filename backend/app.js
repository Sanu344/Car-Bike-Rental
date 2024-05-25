const express = require("express");
const app = express();
const cors = require("cors");

//middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/api/test", (req, res) => {
  res.send({ message: "server working" });
});

module.exports = app;
