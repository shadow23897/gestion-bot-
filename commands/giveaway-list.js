module.exports = {
    name: "giveaway-list",
    description: "Affiche la liste des giveaways actifs dans le salon.",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageMessages")) {
        return message.reply("Tu n’as pas la permission d’utiliser cette commande.");
      }
  
      try {
        const messages = await message.channel.messages.fetch({ limit: 100 });
        const giveaways = messages.filter(msg =>
          msg.embeds[0] &&
          msg.embeds[0].title &&
          msg.embeds[0].title.toLowerCase().includes("giveaway")
        );
  
        if (giveaways.size === 0) {
          return message.channel.send("❌ Aucun giveaway trouvé dans ce salon.");
        }
  
        const list = giveaways.map(msg =>
          `🎁 [Giveaway](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${msg.id}) — lancé par ${msg.embeds[0]?.footer?.text || "inconnu"}`
        ).join("\n");
  
        message.channel.send(`📋 **Giveaways actifs dans ce salon :**\n${list}`);
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors de la récupération des giveaways.");
      }
    }
  };
  