module.exports = {
    name: "userinfo",
    description: "Affiche des informations sur un utilisateur. Utilisation : +userinfo [@utilisateur]",
    execute(message, args) {
      const user = message.mentions.users.first() || message.author;
      const member = message.guild.members.cache.get(user.id);
  
      const userInfo = `
  **Nom :** ${user.tag}
  **ID :** ${user.id}
  **Créé le :** ${user.createdAt.toDateString()}
  **Rejoint le serveur le :** ${member.joinedAt.toDateString()}
  **Rôles :** ${member.roles.cache
        .filter(role => role.id !== message.guild.id)
        .map(role => role.toString())
        .join(", ") || "Aucun"}
      `;
  
      message.channel.send(userInfo);
    }
  };
  