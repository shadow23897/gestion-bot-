module.exports = {
    name: "addrole",
    description: "Ajoute un rôle à un utilisateur. Utilisation : +addrole @utilisateur @rôle",
    async execute(message, args) {
     
      if (!message.member.permissions.has("ManageRoles")) {
        return message.reply("Tu n’as pas la permission d’ajouter des rôles !");
      }
  
      const member = message.mentions.members.first();
      const role = message.mentions.roles.first();
  
      if (!member || !role) {
        return message.reply("Utilisation incorrecte. Exemple : `+addrole @utilisateur @rôle`");
      }
  
      if (member.roles.cache.has(role.id)) {
        return message.reply("Cet utilisateur a déjà ce rôle.");
      }
  
      try {
        await member.roles.add(role);
        message.channel.send(`✅ Le rôle ${role.name} a été ajouté à ${member.user.tag}`);
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue en ajoutant le rôle.");
      }
    }
  };
  