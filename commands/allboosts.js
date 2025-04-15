module.exports = {
    name: "allboosts",
    description: "Affiche la liste des membres qui boostent le serveur.",
    async execute(message, args) {
      const boosters = message.guild.members.cache.filter(member => member.premiumSince);
  
      if (boosters.size === 0) {
        return message.channel.send("🚫 Aucun membre ne booste actuellement ce serveur.");
      }
  
      const list = boosters.map(member => {
        const date = `<t:${Math.floor(member.premiumSince.getTime() / 1000)}:R>`;
        return `• ${member.user.tag} (ID: ${member.id}) — Boost depuis ${date}`;
      }).join("\n");
  
      if (list.length > 2000) {
        return message.reply("La liste est trop longue pour être affichée en une seule fois.");
      }
  
      message.channel.send(`🚀 **Boosters du serveur (${boosters.size}) :**\n${list}`);
    }
  };
  