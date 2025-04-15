module.exports = {
    name: "ticket-open",
    description: "Ouvre un ticket de support privé.",
    async execute(message, args) {
      const guild = message.guild;
      const user = message.author;
      const existing = guild.channels.cache.find(c => c.name === `ticket-${user.id}`);
  
      if (existing) {
        return message.reply("❗ Tu as déjà un ticket ouvert.");
      }
  
      const staffRole = guild.roles.cache.find(r => r.name.toLowerCase().includes("staff")) || message.guild.roles.everyone;
  
      try {
        const ticketChannel = await guild.channels.create({
          name: `ticket-${user.id}`,
          type: 0, 
          topic: `Ticket de ${user.tag}`,
          permissionOverwrites: [
            {
              id: guild.id, 
              deny: ["ViewChannel"]
            },
            {
              id: user.id,
              allow: ["ViewChannel", "SendMessages", "AttachFiles"]
            },
            {
              id: staffRole.id,
              allow: ["ViewChannel", "SendMessages", "ManageMessages"]
            }
          ]
        });
  
        ticketChannel.send(`🎟️ Bonjour <@${user.id}>, un membre du staff te répondra bientôt !`);
        message.reply("✅ Ton ticket a été ouvert avec succès !");
      } catch (error) {
        console.error(error);
        message.reply("❌ Une erreur est survenue lors de la création du ticket.");
      }
    }
  };
  