const fs = require("fs");
const path = require("path");
const { AttachmentBuilder } = require("discord.js");

module.exports = {
  name: "ticket-transcript",
  description: "Génère une transcription du ticket et l’envoie dans ce salon.",
  async execute(message, args) {
    const channel = message.channel;

    if (!channel.name.startsWith("ticket-")) {
      return message.reply("❌ Cette commande doit être utilisée dans un salon de ticket.");
    }

    if (!message.member.permissions.has("ManageMessages")) {
      return message.reply("Tu n’as pas la permission de générer un transcript.");
    }

    try {
      const messages = await channel.messages.fetch({ limit: 100 });
      const sorted = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

      const transcriptLines = sorted.map(msg => {
        const time = new Date(msg.createdTimestamp).toLocaleString("fr-BE");
        return `[${time}] ${msg.author.tag}: ${msg.content}`;
      });

      const transcriptText = transcriptLines.join("\n");
      const fileName = `transcript-${channel.name}.txt`;
      const filePath = path.join(__dirname, `../transcripts/${fileName}`);

      
      const transcriptFolder = path.join(__dirname, "../transcripts");
      if (!fs.existsSync(transcriptFolder)) fs.mkdirSync(transcriptFolder);

      
      fs.writeFileSync(filePath, transcriptText);

      const file = new AttachmentBuilder(filePath);
      await channel.send({
        content: "📄 Voici la transcription du ticket :",
        files: [file]
      });

    } catch (error) {
      console.error(error);
      message.reply("❌ Une erreur est survenue lors de la génération du transcript.");
    }
  }
};
