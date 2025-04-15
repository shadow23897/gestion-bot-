module.exports = {
    name: "say",
    description: "Fait parler le bot. Utilisation : +say ton message ici",
    execute(message, args) {
      const text = args.join(" ");
      if (!text) {
        return message.reply("Tu dois me dire quoi dire ! Exemple : `+say Bonjour tout le monde`");
      }
  
      message.delete().catch(() => {});
      message.channel.send(text);
    }
  };
  