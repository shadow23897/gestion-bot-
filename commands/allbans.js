module.exports = {
    name: "allbans",
    description: "Affiche la liste des utilisateurs bannis du serveur.",
    async execute(message, args) {
      if (!message.member.permissions.has("BanMembers")) {
        return message.reply("Tu n’as pas la permission de voir la liste des bannis !");
      }
  
      try {
        const bans = await message.guild.bans.fetch();
  
        if (bans.size === 0) {
          return message.channel.send("✅ Il n’y a actuellement **aucun utilisateur banni** sur ce serveur.");
        }
  
        let list = `🚫 **Liste des bannis (${bans.size}) :**\n`;
        bans.forEach((ban, index) => {
          list += `• **${ban.user.tag}** (ID: ${ban.user.id})${ban.reason ? ` — Raison : ${ban.reason}` : ""}\n`;
        });
  
        
        if (list.length > 2000) {
          return message.reply("La liste est trop longue pour être affichée dans un seul message.");
        }
  
        message.channel.send(list);
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue en récupérant la liste des bannis.");
      }
    }
  };
  