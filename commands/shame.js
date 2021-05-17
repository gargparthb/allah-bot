import {
  MessageEmbed,
  Guild
} from "discord.js";

import Member from '../Member.js';
import mongoose from 'mongoose';
const { Model } = mongoose

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
      .addField('Reason:', "For attempting to shame to Caliph!")

    shameeID = msg.member.id;

    Member.findById(shameeID, function (err, member) {
      let count = 1;

      if (member) {
        count = member.numberOfTimesShammed;
      } else {
        new Member({ _id: shameeID }).save()
          .catch(err => console.error(err));
      }

      caliphEmbed.addField('Shame Count:', count, false);

      msg.channel.send(caliphEmbed);
    });

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

    shameeID = mentioned.id;

    Member.findById(shameeID, function (err, member) {
      let count = 1;

      if (member) {
        count = member.numberOfTimesShammed;
      } else {
        new Member({ _id: shameeID }).save()
          .catch(err => console.error(err));
      }

      shameEmbed.addField('Shame Count:', count, false);


      msg.channel.send(shameEmbed);
    });

  }

  Member.findByIdAndUpdate(shameeID, { $inc: { 'numberOfTimesShammed': 1 } }).exec();

}