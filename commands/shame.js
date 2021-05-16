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
      .addField('Shame Count:', getShameCount(msg.member.id));

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

    // let shameCount = getUser(mentioned.id)
    //   .then(x => x ? x : 0)
    //   .catch(err => console.error(err));

    getUser(mentioned.id)
      .then(x => shameEmbed.addField('Shame Count:', x, false));


    msg.channel.send(shameEmbed);
    shameeID = mentioned.id;
  }
}

function getUser(shameeID) {
  return Member.findById(shameeID).exec();
}