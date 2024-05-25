const mongoose = require("mongoose");
const app = require("./app");
const config = require("config");

if (!config.get("MONGOURL")) {
  console.error("FATAL ERROR: mongo url is not defined");
  process.exit(1);
}

const port = process.env.PORT || 3030;
mongoose.connect(config.get("MONGOURL")).then(() => {
  console.log("connected to data base... ");
  app.listen(port, () => console.log("listening on port...", port));
});
