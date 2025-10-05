const { WebClient, LogLevel } = require("@slack/web-api");
const { slack } = require("../config/slack.config");

const webClient = new WebClient(slack.botToken, {
  logLevel: LogLevel.DEBUG,
});

exports.sendMessage = async (text) => {
  return await webClient.chat.postMessage({
    token: slack.botToken,
    channel: slack.defaultChannel,
    text,
  });
};

exports.getMessages = async () => {
  return await webClient.conversations.history({
    token: slack.botToken,
    channel: slack.defaultChannel,
    inclusive: true,
    limit: 5,
  });
};

exports.editMessage = async (ts, text) => {
  return await webClient.chat.update({
    channel: slack.defaultChannel,
    ts,
    text,
  });
};

exports.deleteMessage = async (ts) => {
  return await webClient.chat.delete({
    channel: slack.defaultChannel,
    ts,
  });
};

exports.scheduleMessage = async (text, postAt) => {
  return await webClient.chat.scheduleMessage({
    channel: slack.defaultChannel,
    text,
    post_at: postAt,
  });
};
