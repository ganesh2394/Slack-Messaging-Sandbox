const express = require("express");
const { oauthRedirect } = require("../controllers/auth.controller");

const router = express();

router.get("/oauth", oauthRedirect);

module.exports = router;
