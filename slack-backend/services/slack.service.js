const { WebClient, LogLevel } = require("@slack/web-api");
const { slack } = require("../config/slack.config");
const fs = require("fs");
const path = require("path");

const TOKEN_STORE_FILE = path.join(__dirname, "..", "utils/tokens.json");

function loadTokens() {
  if (!fs.existsSync(TOKEN_STORE_FILE)) return null;
  return JSON.parse(fs.readFileSync(TOKEN_STORE_FILE));
}

function getSlackClient() {
  const tokens = loadTokens();
  if (!tokens?.access_token && !tokens?.bot_token) {
    throw new Error("Bot token not found. Please reinstall Slack app.");
  }

  const botToken = tokens.access_token || tokens.bot_token;
  return new WebClient(botToken, { logLevel: LogLevel.DEBUG });
}

// const webClient = new WebClient(slack.botToken, {
//   logLevel: LogLevel.DEBUG,
// });

exports.sendMessage = async (text) => {
  const client = getSlackClient();
  return await client.chat.postMessage({
    channel: slack.defaultChannel,
    text,
  });
};

exports.getMessages = async () => {
  const client = getSlackClient();
  return await client.conversations.history({
    channel: slack.defaultChannel,
    inclusive: true,
    limit: 5,
  });
};

exports.editMessage = async (ts, text) => {
  const client = getSlackClient();
  return await client.chat.update({
    channel: slack.defaultChannel,
    ts,
    text,
  });
};

exports.deleteMessage = async (ts) => {
  const client = getSlackClient();
  return await client.chat.delete({
    channel: slack.defaultChannel,
    ts,
  });
};

exports.scheduleMessage = async (text, postAt) => {
  const client = getSlackClient();
  return await client.chat.scheduleMessage({
    channel: slack.defaultChannel,
    text,
    post_at: postAt,
  });
};
