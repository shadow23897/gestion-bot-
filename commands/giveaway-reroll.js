module.exports = {
    name: "giveaway-reroll",
    description: "Relance les gagnants d’un giveaway terminé. Utilisation : +giveaway-reroll <messageID>",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageMessages")) {
        return message.reply("Tu n’as pas la permission de reroll un giveaway !");
      }
  
      const messageId = args[0];
      if (!messageId) {
        return message.reply("Tu dois spécifier l’ID du message du giveaway. Exemple : `+giveaway-reroll 123456789012345678`");
      }
  
      try {
        const giveawayMessage = await message.channel.messages.fetch(messageId);
        if (!giveawayMessage) return message.reply("Message introuvable dans ce salon.");
  
        const reaction = giveawayMessage.reactions.cache.get("🎉");
        if (!reaction) return message.reply("Ce message n’a pas de réaction 🎉.");
  
        const users = await reaction.users.fetch();
        const participants = users.filter(u => !u.bot).map(u => u.id);
  
        if (participants.length === 0) {
          return message.channel.send("❌ Personne n’a participé à ce giveaway.");
        }
  
        
        const embed = giveawayMessage.embeds[0];
        const match = embed?.description?.match(/Gagnants\s*:\s*(\d+)/i);
        const winnerCount = match ? parseInt(match[1]) : 1;
  
        const winners = [];
        while (winners.length < winnerCount && participants.length > 0) {
          const winnerID = participants.splice(Math.floor(Math.random() * participants.length), 1)[0];
          winners.push(`<@${winnerID}>`);
        }
  
        message.channel.send(`🔁 Nouveau tirage ! Félicitations à ${winners.join(", ")} qui remportent **${embed?.description?.split("Prix :** ")[1]?.split("\n")[0] || "un prix"}** !`);
      } catch (err) {
        console.error(err);
        message.reply("❌ Une erreur est survenue lors du reroll du giveaway.");
      }
    }
  };
  