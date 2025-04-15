module.exports = {
    name: "allroles",
    description: "Affiche la liste de tous les rôles du serveur.",
    async execute(message, args) {
      const roles = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .filter(role => role.name !== "@everyone");
  
      if (roles.size === 0) {
        return message.channel.send("❌ Aucun rôle trouvé sur ce serveur.");
      }
  
      const list = roles.map(role => 
        `• ${role.name} (ID: ${role.id}) — ${role.members.size} membre(s)`
      ).join("\n");
  
      if (list.length > 2000) {
        return message.reply("La liste est trop longue pour être affichée ici.");
      }
  
      message.channel.send(`📜 **Rôles du serveur (${roles.size}) :**\n${list}`);
    }
  };
  