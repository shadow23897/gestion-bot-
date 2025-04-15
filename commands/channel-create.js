module.exports = {
    name: "channel-create",
    description: "Crée un salon textuel. Utilisation : +channel-create <nom> [#catégorie]",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de créer des salons !");
      }
  
      const name = args[0];
      if (!name) {
        return message.reply("Tu dois spécifier un nom pour le salon. Exemple : `+channel-create general`");
      }
  
      
      const category = message.mentions.channels.find(c => c.type === 4); 
  
      try {
        const newChannel = await message.guild.channels.create({
          name: name,
          type: 0, 
          parent: category ? category.id : null,
          reason: `Salon créé par ${message.author.tag}`
        });
  
        message.channel.send(`✅ Salon **${newChannel.name}** créé avec succès${category ? ` dans la catégorie ${category.name}` : ""} !`);
      } catch (err) {
        console.error(err);
        message.reply("Une erreur est survenue lors de la création du salon.");
      }
    }
  };
  