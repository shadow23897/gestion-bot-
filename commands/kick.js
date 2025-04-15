module.exports = {
    name: "kick",
    description: "Expulse un utilisateur du serveur. Utilisation : +kick @utilisateur [raison]",
    async execute(message, args) {
      if (!message.member.permissions.has("KickMembers")) {
        return message.reply("Tu n’as pas la permission d’expulser des membres !");
      }
  
      const member = message.mentions.members.first();
      if (!member) {
        return message.reply("Tu dois mentionner un utilisateur à expulser. Exemple : `+kick @utilisateur raison`");
      }
  
      if (!member.kickable) {
        return message.reply("Je ne peux pas expulser cet utilisateur. Il a peut-être un rôle plus élevé que moi.");
      }
  
      const reason = args.slice(1).join(" ") || "Aucune raison spécifiée";
  
      try {
        await member.kick(reason);
        message.channel.send(`👢 ${member.user.tag} a été expulsé. Raison : ${reason}`);
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors de l’expulsion.");
      }
    }
  };
  