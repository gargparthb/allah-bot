import {
  MessageEmbed,
  Guild
} from "discord.js";

import Member from '../Member.js';
import mongoose from 'mongoose';

export const name = 'shame';
export function execute(msg, args, client) {
  // gets the guild member mentions
  const mentioned = msg.mentions.members.first();

  // seperates the caliph shamming case
  if (mentioned.roles.cache.some(role => role.name == 'Caliph')) {

    const caliphEmbed = generateShameEmbed(client, client.user, msg.member)
      .addField('Reason:', "For attempting to shame to Caliph!");

    prepareEmbed(msg.member.id, caliphEmbed, msg);

  } else {
    let shameEmbed = generateShameEmbed(client, msg.member, mentioned);

    // maybe add a reason
    if (args.length > 1) {
      shameEmbed.addField('Reason:', args.slice(1).join(' '), false);
    }

    prepareEmbed(mentioned.id, shameEmbed, msg);
  }

}

function generateShameEmbed(client, shamer, shamee) {
  return new MessageEmbed()
    .setTitle(`A Public Shaming,`)
    .setColor('RANDOM')
    .setThumbnail(client.user.displayAvatarURL())
    .addField('Shamer:', shamer.toString(), true)
    .addField('Shamee:', shamee.toString(), true);
}

function prepareEmbed(shameeID, embed, msg) {
  Member.findById(shameeID, (err, member) => {
    let count = 1;

    if (member) {
      count = member.numberOfTimesShammed;
    } else {
      new Member({ _id: shameeID }).save()
        .catch(err => console.error(err));
    }

    embed.addField('Shame Count:', count, false);

    msg.channel.send(embed);
  });

  Member.findByIdAndUpdate(shameeID, { $inc: { 'numberOfTimesShammed': 1 } }).exec();
}