const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "Affiche les informations sur le serveur.",
  async execute(message, args) {
    const { guild } = message;

    const embed = new EmbedBuilder()
      .setTitle(`📊 Informations sur le serveur`)
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setColor("Blue")
      .addFields(
        { name: "📛 Nom", value: guild.name, inline: true },
        { name: "🆔 ID", value: guild.id, inline: true },
        { name: "👑 Propriétaire", value: `<@${guild.ownerId}>`, inline: true },
        { name: "👥 Membres", value: `${guild.memberCount}`, inline: true },
        { name: "💬 Salons", value: `${guild.channels.cache.size}`, inline: true },
        { name: "📅 Créé le", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: "🚀 Boosts", value: `${guild.premiumSubscriptionCount} (Niveau ${guild.premiumTier})`, inline: true },
        { name: "🗺️ Région", value: guild.preferredLocale || "Inconnue", inline: true }
      )
      .setFooter({ text: `Demandé par ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

    message.channel.send({ embeds: [embed] });
  }
};
