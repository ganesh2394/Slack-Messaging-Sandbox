# Slack Messaging API Integration

This project demonstrates Slack API integration using OAuth 2.0 for authentication and Slack Web API for performing messaging operations such as sending, scheduling, retrieving, editing, and deleting messages.

## Featured Implementation

| Feature                        | Description                                                          |
| ------------------------------ | -------------------------------------------------------------------- |
| 🔐 **OAuth 2.0 Authorization** | Secure Slack login and workspace connection                          |
| 💬 **Send Messages**           | Post messages to a Slack channel using Web API                       |
| 🕒 **Schedule Messages**       | Schedule messages for future delivery                                |
| 📜 **Retrieve Messages**       | Fetch recent messages from a Slack channel                           |
| ✏️ **Edit Messages**           | Update message text using timestamp (`ts`)                           |
| ❌ **Delete Messages**         | Remove messages from a channel                                       |
| ⚙️ **Token Storage**           | Securely stores OAuth tokens in `utils/tokens.json` (ignored by Git) |

## Used Tech Stack

- Node.js(v18+)
- Express
- Axios
- @slack/web-api
- Ngrok
- dotenv

## Environment Variables

Create a `.env` file inside `slack-backend` folder.

```bash
# port
PORT = your_port

# Slack App Credentials (from Basic Information)
SLACK_CLIENT_ID=your_slack_client_id
SLACK_CLIENT_SECRET=your_slack_client_secret
SLACK_REDIRECT_URI=https://<your-ngrok-url>/api/slack/oauth

# Bot Token (from OAuth & Permissions page ke top par, reinstall ke baad)
SLACK_BOT_TOKEN=xo....
DEFAULT_CHANNEL_ID=C0...

```

## Pre - Before Testing Endpoints

1. Go to `cd slack-backend`
2. Run `npm run dev` command to start the server.
3. Setup the Ngrok for the tunnel `http -> https`
4. Run it using `ngrok http your_backend_port`.
5. Ready to test endpoints
6. You can use `Postman Tool`.

## Testing Endpoints

Send Message

```bash
POST /api/slack/messages/send
Body:{
    'text':"type_your_message"
}
```

Delete a Message

```bash
POST /api/slack/messages/delete
Body:{
    'ts': message_ts
}
```

Schedule a Message

```bash
POST /api/slack/messages/schedule
Body:{
    'text':"type_your_message"
    "postAt": message_time_stamps
}
```

History of Messages

```bash
GET /api/slack/messages/history

```

History of Messages

```bash
POST /api/slack/messages/edit
Body:{
  "ts": ts,
    "text": updated_message
}

```

## Excluding files and folder

- .env
- node_modules
- utils/tokens.json

## Slack Information

### Used Redirect URL

```bash
https://<your-ngrok-url>/api/slack/oauth
```

### Bot Token Scopes

```pgsql
chat:write, chat:write.public, channels:read,
channels:history, groups:read, chat:write.customize
```

## Author

**Name:** Ganesh Prasad

**Project:** Slack Messaging API Backend
