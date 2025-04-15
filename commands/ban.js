module.exports = {
    name: "ban",
    description: "Bannit un utilisateur. Utilisation : +ban @utilisateur [raison]",
    async execute(message, args) {
      
      if (!message.member.permissions.has("BanMembers")) {
        return message.reply("Tu n’as pas la permission de bannir des membres !");
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply("Tu dois mentionner un utilisateur à bannir. Exemple : `+ban @utilisateur raison`");
      }
  
      if (!member.bannable) {
        return message.reply("Je ne peux pas bannir cet utilisateur. Peut-être a-t-il un rôle plus élevé que moi ?");
      }
  
      const reason = args.slice(1).join(" ") || "Aucune raison spécifiée";
  
      try {
        await member.ban({ reason });
        message.channel.send(`🚫 ${member.user.tag} a été banni. Raison : ${reason}`);
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors du bannissement.");
      }
    }
  };
  