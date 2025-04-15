module.exports = {
    name: "unlock",
    description: "Déverrouille le salon actuel. Les membres pourront envoyer des messages.",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de déverrouiller les salons !");
      }
  
      const channel = message.channel;
  
      try {
        await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
          SendMessages: true
        });
  
        message.channel.send("🔓 Le salon a été déverrouillé. Les membres peuvent à nouveau envoyer des messages.");
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors du déverrouillage du salon.");
      }
    }
  };
  