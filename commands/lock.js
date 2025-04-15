module.exports = {
    name: "lock",
    description: "Verrouille le salon actuel. Personne ne pourra y envoyer de messages.",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de verrouiller les salons !");
      }
  
      const channel = message.channel;
  
      try {
        await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
          SendMessages: false
        });
  
        message.channel.send("🔒 Le salon a été verrouillé. Les membres ne peuvent plus envoyer de messages.");
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors du verrouillage du salon.");
      }
    }
  };
  