const express = require("express");
const dotevn = require("dotenv");
dotevn.config();

const { port } = require("./config/slack.config");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Slack Backend Server is Running!");
});

app.use("/api/slack", authRoutes);
app.use("/api/slack/messages", messageRoutes);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
