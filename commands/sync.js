module.exports = {
    name: "sync",
    description: "Synchronise les permissions du salon avec sa catégorie.",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de gérer les salons !");
      }
  
      const channel = message.channel;
  
      if (!channel.parent) {
        return message.reply("Ce salon n'est pas dans une catégorie, rien à synchroniser.");
      }
  
      try {
        await channel.lockPermissions();
        message.channel.send("✅ Les permissions ont été synchronisées avec la catégorie !");
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors de la synchronisation.");
      }
    }
  };
  