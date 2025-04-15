module.exports = {
    name: "channel-delete",
    description: "Supprime un salon. Utilisation : +channel-delete [#salon]",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de supprimer des salons !");
      }
  
      const channel = message.mentions.channels.first() || message.channel;
  
      if (!channel.deletable) {
        return message.reply("Je ne peux pas supprimer ce salon.");
      }
  
      try {
        await channel.delete(`Supprimé par ${message.author.tag}`);
        if (channel !== message.channel) {
          message.channel.send(`🗑️ Le salon ${channel.name} a été supprimé.`);
        }
      } catch (err) {
        console.error(err);
        message.reply("Une erreur est survenue lors de la suppression du salon.");
      }
    }
  };
  