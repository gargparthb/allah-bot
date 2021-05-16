import {
  MessageEmbed,
  Guild
} from "discord.js";

import Member from '../Member.js';
import {
  Model
} from "mongoose";

export const name = 'shame';
export function execute(msg, args, client) {
  // gets the guild member mentions
  const mentioned = msg.mentions.members.first();

  let shameeID;

  // seperates the caliph shamming case
  if (mentioned.roles.cache.some(role => role.name == 'Caliph')) {

    const caliphEmbed = new MessageEmbed()
      .setTitle(`A Public Shaming,`)
      .setColor('RANDOM')
      .setThumbnail(client.user.displayAvatarURL())
      .addField('Shamer:', client.user.toString(), true)
      .addField('Shamee:', msg.member.toString(), true)
      .addField('Reason:', "For attempting to shame to Caliph!");

    msg.channel.send(caliphEmbed);
    shameeID = msg.member.id;
  } else {
    let shameEmbed = new MessageEmbed()
      .setTitle(`A Public Shaming,`)
      .setColor('RANDOM')
      .setThumbnail(client.user.displayAvatarURL())
      .addField('Shamer:', msg.member.toString(), true)
      .addField('Shamee:', mentioned.toString(), true);

    // maybe add a reason
    if (args.length > 1) {
      shameEmbed.addField('Reason:', args.slice(1).join(' '), false);
    }

    msg.channel.send(shameEmbed);
    shameeID = mentioned.id;
  }

  //console.log(Member.findById(shameeID));
}