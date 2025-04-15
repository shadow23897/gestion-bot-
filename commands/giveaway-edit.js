const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "giveaway-edit",
  description: "Modifie un giveaway existant. Utilisation : +giveaway-edit <messageID> <nouvelle_durée> <nouveaux_gagnants> <nouveau_prix>",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages")) {
      return message.reply("Tu n’as pas la permission de modifier un giveaway !");
    }

    const [messageId, newDuration, newWinners] = args;
    const newPrize = args.slice(3).join(" ");

    if (!messageId || !newDuration || !newWinners || !newPrize) {
      return message.reply("Utilisation : `+giveaway-edit <messageID> <nouvelle_durée> <gagnants> <nouveau_prix>`");
    }

    const durationMs = ms(newDuration);
    if (isNaN(durationMs) || durationMs <= 0) {
      return message.reply("⏳ Durée invalide. Exemple : `1h`, `30m`, `2d`...");
    }

    const winnersCount = parseInt(newWinners);
    if (isNaN(winnersCount) || winnersCount <= 0) {
      return message.reply("Le nombre de gagnants doit être un nombre supérieur à 0.");
    }

    try {
      const giveawayMessage = await message.channel.messages.fetch(messageId);
      if (!giveawayMessage) return message.reply("Message introuvable dans ce salon.");

      const embed = new EmbedBuilder()
        .setTitle("🎉 GIVEAWAY (Modifié) 🎉")
        .setDescription(`Réagis avec 🎉 pour participer !\n\n**🎁 Prix :** ${newPrize}\n**👥 Gagnants :** ${winnersCount}\n**⏳ Finit dans :** <t:${Math.floor((Date.now() + durationMs) / 1000)}:R>`)
        .setColor("Orange")
        .setFooter({ text: `Modifié par ${message.author.tag}` });

      await giveawayMessage.edit({ embeds: [embed] });

      message.channel.send("✅ Le giveaway a été mis à jour !");
    } catch (err) {
      console.error(err);
      message.reply("❌ Une erreur est survenue lors de la modification du giveaway.");
    }
  }
};
