const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "pp",
  description: "Affiche la photo de profil d’un utilisateur. Utilisation : +pp [@utilisateur]",
  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;

    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
      .setTitle(`🖼️ Avatar de ${user.tag}`)
      .setImage(avatarURL)
      .setColor("Random")
      .setFooter({ text: `ID: ${user.id}` });

    message.channel.send({ embeds: [embed] });
  }
};
