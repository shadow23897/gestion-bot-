const { ActivityType } = require("discord.js");

module.exports = {
  name: "setpresence",
  description: "Change le statut du bot. Utilisation : +setpresence <type> <message>",
  async execute(message, args) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("❌ Tu n’as pas la permission de changer le statut du bot.");
    }

    const typeInput = args[0]?.toLowerCase();
    const statusMessage = args.slice(1).join(" ");

    if (!typeInput || !statusMessage) {
      return message.reply("Utilisation : `+setpresence <type> <message>`\nTypes possibles : `playing`, `listening`, `watching`, `competing`");
    }

    const typeMap = {
      playing: ActivityType.Playing,
      listening: ActivityType.Listening,
      watching: ActivityType.Watching,
      competing: ActivityType.Competing
    };

    const activityType = typeMap[typeInput];
    if (!activityType) {
      return message.reply("❌ Type d'activité invalide. Utilise : `playing`, `listening`, `watching`, `competing`");
    }

    try {
      message.client.user.setActivity(statusMessage, { type: activityType });
      message.channel.send(`✅ Statut mis à jour : **${typeInput} ${statusMessage}**`);
    } catch (error) {
      console.error(error);
      message.reply("❌ Une erreur est survenue lors de la mise à jour du statut.");
    }
  }
};
