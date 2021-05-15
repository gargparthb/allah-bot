const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'shame',
  execute(msg, args, client) {
    const shamee = msg.mentions.members.first();
    if (shamee.roles.cache.some(role => role.name == 'Caliph')) {
      const caliphEmbed = new MessageEmbed();
      msg.channel.send(`Shame on ${message.author.toString()}, for trying to shame the Caliph!`);
    } else {
      const embed = new MessageEmbed()
        .setTitle(`A Public Shaming,`)
        .setColor([0, 135, 0])
        .setThumbnail(client.user.displayAvatarURL())
        .addField('Shamer:', msg.author.toString(), true)
        .addField('Shamee:', shamee.toString(), true);

      msg.channel.send(embed);
    }
  }
}