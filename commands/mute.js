module.exports = {
    name: "mute",
    description: "Réduit un utilisateur au silence pendant un certain temps. Utilisation : +mute @utilisateur durée raison",
    async execute(message, args) {
      if (!message.member.permissions.has("ModerateMembers")) {
        return message.reply("Tu n’as pas la permission de timeout des membres.");
      }
  
      const member = message.mentions.members.first();
      const duration = args[1]; 
      const reason = args.slice(2).join(" ") || "Aucune raison spécifiée";
  
      if (!member) {
        return message.reply("Tu dois mentionner un utilisateur à mute. Exemple : `+mute @utilisateur 10m raison`");
      }
  
      if (!duration) {
        return message.reply("Tu dois spécifier une durée. Exemple : `10m`, `1h`, `2d`, etc.");
      }
  
      
      const ms = require("ms");
      const timeMs = ms(duration);
      if (!timeMs || timeMs < 1000 || timeMs > 28 * 24 * 60 * 60 * 1000) {
        return message.reply("La durée doit être comprise entre 1s et 28 jours maximum.");
      }
  
      try {
        await member.timeout(timeMs, reason);
        message.channel.send(`🔇 ${member.user.tag} a été mute pendant ${duration}. Raison : ${reason}`);
      } catch (error) {
        console.error(error);
        message.reply("Impossible de mute cet utilisateur.");
      }
    }
  };
  