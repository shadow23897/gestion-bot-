module.exports = {
    name: "renew",
    description: "Renouvelle le salon actuel (le supprime et le recrée).",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageChannels")) {
        return message.reply("Tu n’as pas la permission de gérer les salons !");
      }
  
      const channel = message.channel;
      const position = channel.position;
      const name = channel.name;
      const parent = channel.parent;
  
      try {
        await channel.delete();
  
        const newChannel = await message.guild.channels.create({
          name,
          type: channel.type,
          parent: parent,
          position: position,
          reason: `Salon renouvelé par ${message.author.tag}`
        });
  
        newChannel.send("✅ Salon renouvelé avec succès !");
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors du renouvellement.");
      }
    }
  };
  