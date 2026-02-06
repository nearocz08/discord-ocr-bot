// ======================
// LOAD
// ======================
console.log("START BOT...");

require("dotenv").config();

const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

// ======================
// EXPRESS SERVER (กัน Render หลับ)
// ======================
const app = express();

app.get("/", (req, res) => {
  res.send("BOT IS RUNNING");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Web server ready");
});

// ======================
// CHECK TOKEN
// ======================
console.log("STEP 1");

if (!process.env.DISCORD_TOKEN) {
  console.log("❌ TOKEN NOT FOUND");
  process.exit(1);
}

console.log("STEP 2");
console.log("TOKEN EXIST:", !!process.env.DISCORD_TOKEN);
console.log("TOKEN LENGTH:", process.env.DISCORD_TOKEN.length);

// ======================
// CREATE CLIENT
// ======================
console.log("STEP 3");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

console.log("STEP 4");

// ======================
// READY EVENT
// ======================
client.once("ready", () => {
  console.log("✅ LOGIN SUCCESS");
  console.log("BOT NAME:", client.user.tag);
});

// ======================
// ERROR EVENT
// ======================
client.on("error", err => {
  console.error("CLIENT ERROR:", err);
});

// ======================
// LOGIN
// ======================
console.log("STEP 5 - LOGIN");

client.login(process.env.DISCORD_TOKEN)
  .catch(err => {
    console.error("❌ LOGIN ERROR:", err);
  });
