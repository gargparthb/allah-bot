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
      const shamee = msg.mentions.members.find(() => true);

      if (shamee.roles.highest.name === 'Caliph') {
        msg.channel.send(`Shame on ${msg.author.toString()}, for trying to shame the Caliph!`);
      } else {
        msg.channel.send(`${msg.author.toString()} has shamed ${shamee.toString()}`);
      }
    }
  }
});