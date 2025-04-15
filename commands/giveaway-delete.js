module.exports = {
    name: "giveaway-delete",
    description: "Supprime un giveaway avec l'ID du message. Utilisation : +giveaway-delete <messageID>",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageMessages")) {
        return message.reply("Tu n’as pas la permission de supprimer un giveaway !");
      }
  
      const messageId = args[0];
      if (!messageId) {
        return message.reply("Tu dois spécifier l'ID du message du giveaway. Exemple : `+giveaway-delete 123456789012345678`");
      }
  
      try {
        const fetchedMessage = await message.channel.messages.fetch(messageId);
        if (!fetchedMessage) {
          return message.reply("❌ Impossible de trouver le message avec cet ID dans ce salon.");
        }
  
        await fetchedMessage.delete();
        message.channel.send("🗑️ Le giveaway a été supprimé avec succès.");
      } catch (error) {
        console.error(error);
        message.reply("❌ Une erreur est survenue. Vérifie que l'ID est correct et que le message est dans ce salon.");
      }
    }
  };
  