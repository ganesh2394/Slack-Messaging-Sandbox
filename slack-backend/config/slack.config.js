const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 3020,
  slack: {
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    redirectUri: process.env.SLACK_REDIRECT_URI,
    botToken: process.env.SLACK_BOT_TOKEN,
    defaultChannel: process.env.DEFAULT_CHANNEL_ID,
  },
};
