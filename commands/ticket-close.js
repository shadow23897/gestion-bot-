module.exports = {
    name: "ticket-close",
    description: "Ferme un ticket en retirant l’accès au membre concerné.",
    async execute(message, args) {
      const channel = message.channel;
  
      if (!channel.name.startsWith("ticket-")) {
        return message.reply("❌ Cette commande ne peut être utilisée que dans un salon de ticket.");
      }
  
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de fermer un ticket.");
      }
  
      
      const userId = channel.name.split("ticket-")[1];
      if (!userId) {
        return message.reply("Impossible d’identifier l’utilisateur lié à ce ticket.");
      }
  
      try {
        await channel.permissionOverwrites.edit(userId, {
          ViewChannel: false
        });
  
        await message.channel.send(`✅ Le ticket a été fermé.`);
      } catch (error) {
        console.error(error);
        message.reply("❌ Une erreur est survenue lors de la fermeture du ticket.");
      }
    }
  };
  