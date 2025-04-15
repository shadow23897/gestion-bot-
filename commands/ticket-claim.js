module.exports = {
    name: "ticket-claim",
    description: "Revendique le ticket en cours.",
    async execute(message, args) {
      const channel = message.channel;
  
      if (!channel.name.startsWith("ticket-")) {
        return message.reply("❌ Cette commande ne peut être utilisée que dans un salon de ticket.");
      }
  
      const claimedBy = `<@${message.author.id}>`;
  
      
      if (channel.topic && channel.topic.includes("Claimed by")) {
        return message.reply("Ce ticket a déjà été revendiqué.");
      }
  
      try {
        await channel.setTopic(`Ticket de support revendiqué par ${message.author.tag}`);
        await message.channel.send(`🛠️ Ce ticket est maintenant pris en charge par ${claimedBy}.`);
      } catch (error) {
        console.error(error);
        message.reply("❌ Une erreur est survenue lors de la prise en charge du ticket.");
      }
    }
  };
  