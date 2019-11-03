const express = require("express");
const mongoose = require("./config/database");
const router = require("./config/routes");
const port = process.env.PORT || 3004;

// const port=3004
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(port, () => {
  console.log("listening on port", port);
});
