const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();

client.once('ready', () => {
  console.log('Allahu Akbar');
});

client.login(process.env.BOT_TOKEN);

client.on('message', msg => {
  if (msg.content == "Allahu Akbar") {
    msg.channel.send('Peace be with you Brother!');
  }

  if (msg.content.startsWith('!') && !msg.author.bot) {
    const args = msg.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'shame') {
      msg.channel.send(`${msg.author.toString()} has shamed ${msg.mentions.members.find(() => true).toString()}`);
    }
  }
});