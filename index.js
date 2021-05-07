const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();

let techChannelID = '840000105535897610';

client.once('ready', () => {
  console.log('Allahu Akbar');
  let techChannel =
    setInterval(() => {
      client.channels.fetch(techChannelID).then(channel => channel.send("NO HARAM"))
    }, 60 * 60 * 1000);
});

client.login(process.env.BOT_TOKEN);

client.on('message', msg => {
  if (msg.content == "Allahu Akbar") {
    msg.channel.send('Peace be with you Brother!');
  }
});