require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    service: "ELYOM Backend",
    status: "online"
  });
});

// Meta uses this GET request to verify the webhook URL.
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && VERIFY_TOKEN && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Instagram / Messenger / WhatsApp events arrive here.
app.post("/webhook", (req, res) => {
  // Acknowledge Meta immediately. Business logic will be added after
  // the Meta account and webhook subscriptions are connected.
  console.log("Meta webhook event:", JSON.stringify(req.body));
  return res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`ELYOM backend listening on port ${PORT}`);
});
