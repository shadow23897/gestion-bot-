module.exports = {
    name: "alladmin",
    description: "Affiche la liste de tous les membres ayant la permission Administrateur.",
    async execute(message, args) {
      if (!message.member.permissions.has("Administrator")) {
        return message.reply("Tu n’as pas la permission d’utiliser cette commande.");
      }
  
      const admins = message.guild.members.cache.filter(member =>
        member.permissions.has("Administrator") && !member.user.bot
      );
  
      if (admins.size === 0) {
        return message.channel.send("❌ Aucun membre avec la permission `Administrateur` n’a été trouvé.");
      }
  
      const adminList = admins.map(member => `• ${member.user.tag} (${member.id})`).join("\n");
  
      message.channel.send(`👑 **Membres avec la permission \`Administrateur\` :**\n${adminList}`);
    }
  };
  