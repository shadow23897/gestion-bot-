module.exports = {
    name: "ticket-delete",
    description: "Supprime un salon de ticket. Utilisation : +ticket-delete",
    async execute(message, args) {
      const channel = message.channel;
  
      if (!channel.name.startsWith("ticket-")) {
        return message.reply("❌ Cette commande ne peut être utilisée que dans un salon de ticket.");
      }
  
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de supprimer ce salon.");
      }
  
      
      const confirmMsg = await message.channel.send("⚠️ Es-tu sûr de vouloir supprimer ce ticket ? Réponds `oui` pour confirmer.");
  
      const filter = m => m.author.id === message.author.id && m.content.toLowerCase() === "oui";
  
      message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ["time"] })
        .then(() => {
          message.channel.send("🗑️ Suppression du ticket dans 3 secondes...").then(() => {
            setTimeout(() => {
              channel.delete().catch(err => console.error("Erreur lors de la suppression :", err));
            }, 3000);
          });
        })
        .catch(() => {
          message.channel.send("❌ Suppression annulée (aucune confirmation).");
        });
    }
  };
  