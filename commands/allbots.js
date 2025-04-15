module.exports = {
    name: "allbots",
    description: "Affiche la liste de tous les bots du serveur.",
    async execute(message, args) {
      const bots = message.guild.members.cache.filter(member => member.user.bot);
  
      if (bots.size === 0) {
        return message.channel.send("🤖 Aucun bot n’a été trouvé sur ce serveur.");
      }
  
      const list = bots.map(bot => `• ${bot.user.tag} (ID: ${bot.id})`).join("\n");
  
      
      if (list.length > 2000) {
        return message.reply("La liste est trop longue pour être affichée ici.");
      }
  
      message.channel.send(`🤖 **Liste des bots (${bots.size}) :**\n${list}`);
    }
  };
  