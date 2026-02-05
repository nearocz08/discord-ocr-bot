const express = require("express");
const app = express();

app.get("/", (req,res)=>{
  res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("Web server ready"));

const { Client, GatewayIntentBits } = require("discord.js");
const fetch = require("node-fetch");

const TOKEN = process.env.DISCORD_TOKEN;
const GAS_URL = "https://script.google.com/macros/s/AKfycbx6QYePOeoPorFNBdfsxBxIu5LOvFkzMX2KN14qfXNt9RwpteofusEuzi0ZQlW62tSeug/exec";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log("BOT ONLINE");
});

client.on("messageCreate", async (message) => {
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
});

client.login(TOKEN);



