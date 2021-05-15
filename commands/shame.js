import { MessageEmbed } from "discord.js";

export const name = 'shame';
export function execute(msg, args, client) {
  // gets the guild member mentions
  const shamee = msg.mentions.members.first();
  // seperates the caliph shamming case
  if (shamee.roles.cache.some(role => role.name == 'Caliph')) {
    const caliphEmbed = new MessageEmbed()
      .setTitle(`A Public Shaming,`)
      .setColor('RANDOM')
      .setThumbnail(client.user.displayAvatarURL())
      .addField('Shamer:', client.user.toString(), true)
      .addField('Shamee:', msg.author.toString(), true)
      .addField('Reason:', "For attempting to shame to Caliph!");
    msg.channel.send(caliphEmbed);
  } else {
    let shameEmbed = new MessageEmbed()
      .setTitle(`A Public Shaming,`)
      .setColor('RANDOM')
      .setThumbnail(client.user.displayAvatarURL())
      .addField('Shamer:', msg.author.toString(), true)
      .addField('Shamee:', shamee.toString(), true);

    // maybe add a reason
    if (args.length > 1) {
      shameEmbed.addField('Reason:', args.slice(1).join(' '), false);
    }

    msg.channel.send(shameEmbed);
  }
}