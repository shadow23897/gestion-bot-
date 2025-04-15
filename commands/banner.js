const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "banner",
  description: "Affiche la bannière d’un utilisateur. Utilisation : +banner [@utilisateur]",
  async execute(message, args) {
    const user = message.mentions.users.first() || message.author;

    try {
      const fetchedUser = await message.client.users.fetch(user.id, { force: true });
      const bannerURL = fetchedUser.bannerURL({ dynamic: true, size: 1024 });

      if (!bannerURL) {
        return message.channel.send("❌ Cet utilisateur n’a pas de bannière.");
      }

      const embed = new EmbedBuilder()
        .setTitle(`🖼️ Bannière de ${fetchedUser.tag}`)
        .setImage(bannerURL)
        .setColor("Blurple");

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply("Une erreur est survenue lors de la récupération de la bannière.");
    }
  }
};
