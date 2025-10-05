const slackService = require("../services/slack.service");

exports.sendMessage = async (req, res) => {
  const { text } = req.body;

  try {
    const result = await slackService.sendMessage(text);
    res.status(200).json({
      message: "Message sent successfully.",
      success: true,
      error: false,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const result = await slackService.getMessages();
    res.status(200).json({
      success: true,
      message: "Fetched messages successfully",
      error: false,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};

exports.editMessage = async (req, res) => {
  console.log(req.body);
  const { ts, text } = req.body;
  try {
    const result = await slackService.editMessage(ts, text);
    res.status(200).json({
      success: true,
      error: false,
      message: "Message updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};

exports.deleteMessage = async (req, res) => {
  const { ts } = req.body;
  try {
    const result = await slackService.deleteMessage(ts);
    res.status(200).json({
      success: true,
      error: false,
      message: "Message deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};

exports.scheduleMessage = async (req, res) => {
  const { text, postAt } = req.body;
  try {
    const result = await slackService.scheduleMessage(text, postAt);
    res.status(200).json({
      success: true,
      error: false,
      message: "Message scheduled successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};
