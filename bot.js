const express = require("express");
const app = express();

// ===== WEB SERVER (กัน Render หลับ) =====
app.get("/", (req, res) => {
  res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Web server ready"));


// ===== DISCORD BOT =====
const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");

// 🔎 DEBUG START
console.log("START BOT...");
console.log("TOKEN EXIST:", !!process.env.DISCORD_TOKEN);
console.log("TOKEN LENGTH:", process.env.DISCORD_TOKEN?.length);

// ===== CONFIG =====
const GAS_URL = "https://script.google.com/macros/s/AKfycbx6QYePOeoPorFNBdfsxBxIu5LOvFkzMX2KN14qfXNt9RwpteofusEuzi0ZQlW62tSeug/exec";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: ["CHANNEL"]
});

// ===== READY =====
client.once("ready", () => {
  console.log("BOT ONLINE");
});

// ===== RECEIVE IMAGE =====
client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (message.attachments.size === 0) return;

    const attachment = message.attachments.first();
    if (!attachment.contentType?.startsWith("image")) return;

    await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: attachment.url
      })
    });

    console.log("IMAGE SENT TO GAS");
  } catch (err) {
    console.error("ERROR:", err);
  }
});

// ===== LOGIN =====
client.login(process.env.DISCORD_TOKEN)
  .then(()=> console.log("LOGIN SUCCESS"))
  .catch(err=> console.error("LOGIN ERROR:", err));


