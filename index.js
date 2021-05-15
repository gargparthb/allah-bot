import { readdirSync } from 'fs';
import { Client, Collection } from 'discord.js';
const client = new Client();

import dotenv from 'dotenv';
dotenv.config();

client.commands = new Collection();

const commandFiles = readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = import(`./commands/${file}`);
  client.commands.set(command.name, command);
}

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

    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).execute(msg, args, client);
    } catch (error) {
      console.error(error);
      msg.reply('there was an error trying to execute that command!');
    }
  }
});