module.exports = {
    name: "ticket-remove",
    description: "Retire un utilisateur d’un ticket. Utilisation : +ticket-remove @utilisateur",
    async execute(message, args) {
      const userToRemove = message.mentions.members.first();
  
      if (!userToRemove) {
        return message.reply("Tu dois mentionner un utilisateur à retirer. Exemple : `+ticket-remove @membre`");
      }
  
      const channel = message.channel;
  
      if (!channel.name.startsWith("ticket-")) {
        return message.reply("❌ Cette commande ne peut être utilisée que dans un salon de ticket.");
      }
  
      try {
        await channel.permissionOverwrites.edit(userToRemove.id, {
          ViewChannel: false,
          SendMessages: false,
          AttachFiles: false,
          ReadMessageHistory: false
        });
  
        message.channel.send(`❌ <@${userToRemove.id}> a été retiré de ce ticket.`);
      } catch (error) {
        console.error(error);
        message.reply("❌ Une erreur est survenue lors du retrait de l’utilisateur du ticket.");
      }
    }
  };
  