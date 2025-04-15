module.exports = {
    name: "rolecreate",
    description: "Crée un rôle. Utilisation : +rolecreate <nom> [couleur] [mentionnable:true/false]",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageRoles")) {
        return message.reply("Tu n’as pas la permission de créer des rôles !");
      }
  
      const name = args[0];
      const color = args[1] || "#2f3136"; 
      const mentionable = args[2] === "true";
  
      if (!name) {
        return message.reply("Tu dois spécifier un nom pour le rôle. Exemple : `+rolecreate VIP #ff0000 true`");
      }
  
      try {
        const role = await message.guild.roles.create({
          name,
          color,
          mentionable,
          reason: `Rôle créé par ${message.author.tag}`
        });
  
        message.channel.send(`✅ Rôle **${role.name}** créé avec succès${mentionable ? " et est mentionnable" : ""} !`);
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors de la création du rôle.");
      }
    }
  };
  