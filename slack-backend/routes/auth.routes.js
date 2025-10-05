const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const { slack } = require("../config/slack.config");

const CLIENT_ID = slack.clientId;
const REDIRECT_URI = encodeURIComponent(slack.redirectUri);

const SCOPES = encodeURIComponent(
  [
    "chat:write",
    "chat:write.public",
    "channels:read",
    "channels:history",
    "groups:read",
    "chat:write.customize",
  ].join(",")
);

const stateStore = new Map();

router.get("/install", (req, res) => {
  const state = crypto.randomBytes(12).toString("hex");
  stateStore.set(state, Date.now());

  const url = `https://slack.com/oauth/v2/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&state=${state}`;
  // console.log("url : ", url);
  res.redirect(url);
});

router.state = stateStore;
module.exports = router;
