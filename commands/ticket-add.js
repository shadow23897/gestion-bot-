module.exports = {
    name: "ticket-add",
    description: "Ajoute un utilisateur dans un ticket. Utilisation : +ticket-add @utilisateur",
    async execute(message, args) {
      const userToAdd = message.mentions.members.first();
  
      if (!userToAdd) {
        return message.reply("Tu dois mentionner un utilisateur à ajouter. Exemple : `+ticket-add @membre`");
      }
  
      const channel = message.channel;
  
      if (!channel.name.startsWith("ticket-")) {
        return message.reply("❌ Cette commande ne peut être utilisée que dans un salon de ticket.");
      }
  
      try {
        await channel.permissionOverwrites.edit(userToAdd.id, {
          ViewChannel: true,
          SendMessages: true,
          AttachFiles: true,
          ReadMessageHistory: true
        });
  
        message.channel.send(`✅ <@${userToAdd.id}> a été ajouté au ticket.`);
      } catch (error) {
        console.error(error);
        message.reply("❌ Une erreur est survenue lors de l'ajout de l'utilisateur au ticket.");
      }
    }
  };
  