module.exports = {
    name: "unlockall",
    description: "Déverrouille tous les salons textuels du serveur.",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de gérer les salons !");
      }
  
      const channels = message.guild.channels.cache.filter(ch => ch.isTextBased());
  
      let unlocked = 0;
  
      for (const [id, channel] of channels) {
        try {
          await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SendMessages: true
          });
          unlocked++;
        } catch (err) {
          console.error(`Erreur en déverrouillant ${channel.name}:`, err);
        }
      }
  
      message.channel.send(`🔓 Tous les salons textuels ont été déverrouillés. (${unlocked} salons modifiés)`);
    }
  };
  