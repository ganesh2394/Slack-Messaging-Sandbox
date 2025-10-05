const express = require("express");
const {
  sendMessage,
  getMessages,
  editMessage,
  deleteMessage,
  scheduleMessage,
} = require("../controllers/message.controller");

const router = express();

router.get("/history", getMessages);
router.post("/send", sendMessage);
router.post("/edit", editMessage);
router.post("/delete", deleteMessage);
router.post("/schedule", scheduleMessage);

module.exports = router;
