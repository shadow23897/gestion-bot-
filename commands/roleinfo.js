module.exports = {
    name: "roleinfo",
    description: "Affiche les informations sur un rôle. Utilisation : +roleinfo @rôle",
    execute(message, args) {
      const role = message.mentions.roles.first();
  
      if (!role) {
        return message.reply("Tu dois mentionner un rôle. Exemple : `+roleinfo @rôle`");
      }
  
      const roleInfo = `
  **Nom :** ${role.name}
  **ID :** ${role.id}
  **Membres avec ce rôle :** ${role.members.size}
  **Couleur :** ${role.hexColor}
  **Position :** ${role.position}
  **Mentionnable :** ${role.mentionable ? "Oui" : "Non"}
  **Créé le :** ${role.createdAt.toDateString()}
      `;
  
      message.channel.send(roleInfo);
    }
  };
  