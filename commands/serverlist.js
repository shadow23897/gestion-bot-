module.exports = {
    name: "serverlist",
    description: "Affiche la liste des serveurs où le bot est présent.",
    async execute(message, args) {
      const guilds = message.client.guilds.cache;
  
      if (!guilds.size) {
        return message.reply("Le bot n'est dans aucun serveur.");
      }
  
      const list = guilds.map(guild =>
        `• **${guild.name}** (ID: ${guild.id}) — 👥 ${guild.memberCount} membres`
      ).join("\n");
  
      if (list.length > 2000) {
        return message.reply("Trop de serveurs pour afficher la liste ici.");
      }
  
      message.channel.send(`📜 **Serveurs où je suis connecté (${guilds.size}) :**\n${list}`);
    }
  };
  