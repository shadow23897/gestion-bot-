module.exports = {
    name: "ticket-rename",
    description: "Renomme le salon de ticket. Utilisation : +ticket-rename <nouveau-nom>",
    async execute(message, args) {
      const channel = message.channel;
  
      if (!channel.name.startsWith("ticket-")) {
        return message.reply("❌ Cette commande ne peut être utilisée que dans un salon de ticket.");
      }
  
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de renommer ce salon.");
      }
  
      const newName = args.join("-").toLowerCase();
  
      if (!newName || newName.length < 3) {
        return message.reply("Tu dois fournir un nouveau nom valide. Exemple : `+ticket-rename support-technique`");
      }
  
      try {
        await channel.setName(`ticket-${newName}`);
        message.channel.send(`✏️ Le ticket a été renommé en \`ticket-${newName}\`.`);
      } catch (error) {
        console.error(error);
        message.reply("❌ Une erreur est survenue lors du renommage du ticket.");
      }
    }
  };
  