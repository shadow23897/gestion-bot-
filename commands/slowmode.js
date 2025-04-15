module.exports = {
    name: "slowmode",
    description: "Définit un délai entre chaque message (slowmode). Utilisation : +slowmode <secondes>",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de gérer les salons !");
      }
  
      const delay = parseInt(args[0]);
      if (isNaN(delay) || delay < 0 || delay > 21600) {
        return message.reply("Tu dois spécifier une durée entre 0 et 21600 secondes (6h max).");
      }
  
      try {
        await message.channel.setRateLimitPerUser(delay);
        message.channel.send(
          delay === 0
            ? "🚫 Le slowmode a été désactivé."
            : `🐢 Slowmode défini à **${delay} seconde(s)** entre chaque message.`
        );
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors de la configuration du slowmode.");
      }
    }
  };
  