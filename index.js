import {
  readdirSync
} from 'fs';
import {
  Client,
  Collection
} from 'discord.js';
const client = new Client();

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

client.commands = new Collection();

const commandFiles = readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  import(`./commands/${file}`)
    .then(command => client.commands.set(command.name, command))
    .catch(error => console.error(error));
}

client.login(process.env.BOT_TOKEN)
  .catch(err => console.error(err));

client.once('ready', () => {
  console.log('Allahu Akbar');
});

client.on('message', msg => {
  if (msg.content.toLowerCase() == "allahu akbar") {
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

// database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(_ => console.log('DB connected'))
  .catch(err => console.error(err));