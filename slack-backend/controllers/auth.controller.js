const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { slack } = require("../config/slack.config");

const TOKEN_STORE_FILE = path.join(__dirname, "..", "utils/tokens.json");

function saveTokens(data) {
  fs.writeFileSync(TOKEN_STORE_FILE, JSON.stringify(data, null, 2));
}

exports.oauthRedirect = async (req, res) => {
  const { code, state } = req.query;
  if (!code) return res.status(400).send("Missing code parameter");

  const authRoutes = require("../routes/auth.routes");
  const stateStore = authRoutes.state;

  if (!state || !stateStore.has(state)) {
    return res.status(400).send("Invalid or missing state.");
  }

  stateStore.delete(state);

  try {
    const params = new URLSearchParams({
      client_id: slack.clientId,
      client_secret: slack.clientSecret,
      code,
      redirect_uri: slack.redirectUri,
    });

    const tokenRes = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = tokenRes.data;
    // console.log("Token Data :", data);

    if (!data.ok) {
      console.error("OAuth error:", data);
      return res.status(500).send("OAuth failed: " + (data.error || "unknown"));
    }

    // console.log("OAuth success:", data);
    saveTokens(data);
    return res
      .status(200)
      .send(
        "Slack app installed successfully! You can now use messaging APIs."
      );
  } catch (error) {
    console.error("OAuth exchange failed:", err.message);
    return res.status(500).send("OAuth exchange error.");
  }
};
