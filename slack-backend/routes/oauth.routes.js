const express = require("express");
const { oauthRedirect } = require("../controllers/auth.controller");
const router = express.Router();

router.get("/oauth", oauthRedirect);
module.exports = router;
