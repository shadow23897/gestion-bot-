const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "giveaway-create",
  description: "Lance un giveaway. Utilisation : +giveaway-create <durée> <gagnants> <prix>",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages")) {
      return message.reply("Tu n’as pas la permission de lancer un giveaway !");
    }

    const duration = args[0];
    const winnerCount = parseInt(args[1]);
    const prize = args.slice(2).join(" ");

    if (!duration || isNaN(ms(duration))) {
      return message.reply("⏳ Durée invalide. Exemple : `1m`, `1h`, `1d`...");
    }

    if (isNaN(winnerCount) || winnerCount < 1) {
      return message.reply("👥 Nombre de gagnants invalide. Exemple : `1`, `2`, etc.");
    }

    if (!prize) {
      return message.reply("🎁 Tu dois spécifier un prix à gagner !");
    }

    const embed = new EmbedBuilder()
      .setTitle("🎉 GIVEAWAY 🎉")
      .setDescription(`Réagis avec 🎉 pour participer !\n\n**Prix :** ${prize}\n**Gagnants :** ${winnerCount}\n**Temps :** <t:${Math.floor((Date.now() + ms(duration)) / 1000)}:R>`)
      .setColor("Gold")
      .setFooter({ text: `Giveaway lancé par ${message.author.tag}` });

    const giveawayMessage = await message.channel.send({ embeds: [embed] });
    await giveawayMessage.react("🎉");

    setTimeout(async () => {
      const fetchedMessage = await message.channel.messages.fetch(giveawayMessage.id);
      const reactions = fetchedMessage.reactions.cache.get("🎉");
      const users = await reactions.users.fetch();
      const participants = users.filter(u => !u.bot).map(u => u.id);

      if (participants.length === 0) {
        return message.channel.send("❌ Personne n'a participé au giveaway.");
      }

      const winners = [];
      while (winners.length < winnerCount && participants.length > 0) {
        const winnerID = participants.splice(Math.floor(Math.random() * participants.length), 1)[0];
        winners.push(`<@${winnerID}>`);
      }

      message.channel.send(`🎊 Félicitations ${winners.join(", ")} ! Vous avez gagné **${prize}** !`);
    }, ms(duration));
  }
};
