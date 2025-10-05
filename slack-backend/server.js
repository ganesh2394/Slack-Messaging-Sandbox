const dotevn = require("dotenv");
dotevn.config();

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3020;

app.get("/", (req, res) => {
  res.send("Slack Backend Server is Running!");
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
