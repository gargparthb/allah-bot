const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Allahu Akbar');
});

// TODO: .env this
client.login('ODQwMDAyMDQ5NTQxNjY4ODc0.YJR23w.x6rwd8BthOblGqBGjiP6KQjVwUw');

techChannelID = '840000105535897610';
client.on('message', msg => {
  if (msg.channel.id == techChannelID && msg.content == "Allahu Akbar") {
    msg.channel.send('Peace be with you Brother!');
  }
});