module.exports = {
    name: "unban",
    description: "Débannit un utilisateur avec son ID. Utilisation : +unban <userID>",
    async execute(message, args) {
      if (!message.member.permissions.has("BanMembers")) {
        return message.reply("Tu n’as pas la permission de débannir des membres !");
      }
  
      const userId = args[0];
      if (!userId || isNaN(userId)) {
        return message.reply("Tu dois spécifier un ID utilisateur valide. Exemple : `+unban 123456789012345678`");
      }
  
      try {
        const bannedUsers = await message.guild.bans.fetch();
        const bannedUser = bannedUsers.get(userId);
  
        if (!bannedUser) {
          return message.reply("Aucun utilisateur trouvé avec cet ID dans la liste des bannis.");
        }
  
        await message.guild.members.unban(userId);
        message.channel.send(`✅ L'utilisateur **${bannedUser.user.tag}** a été débanni.`);
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors du débannissement.");
      }
    }
  };
  