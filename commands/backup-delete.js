const fs = require("fs");
const path = require("path");

module.exports = {
  name: "backup-delete",
  description: "Supprime un backup en choisissant un numéro depuis la liste.",
  async execute(message, args) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("Tu dois être administrateur pour utiliser cette commande.");
    }

    const backupFolder = path.join(__dirname, "../backups");
    if (!fs.existsSync(backupFolder)) {
      return message.reply("Aucun backup trouvé.");
    }

    const files = fs.readdirSync(backupFolder).filter(file => file.endsWith(".json"));

    if (files.length === 0) {
      return message.reply("Il n'y a aucun backup à supprimer.");
    }

    
    let list = "**Liste des backups disponibles :**\n";
    files.forEach((file, index) => {
      list += `\`${index + 1}\` - ${file}\n`;
    });
    list += "\nRéponds avec le numéro du backup à supprimer.";

    message.channel.send(list);

    
    const filter = response => {
      return response.author.id === message.author.id && !isNaN(response.content);
    };

    message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ["time"] })
      .then(collected => {
        const number = parseInt(collected.first().content);
        if (number < 1 || number > files.length) {
          return message.channel.send("❌ Numéro invalide.");
        }

        const fileToDelete = path.join(backupFolder, files[number - 1]);
        fs.unlinkSync(fileToDelete);
        message.channel.send(`🗑️ Le backup \`${files[number - 1]}\` a été supprimé avec succès.`);
      })
      .catch(() => {
        message.channel.send("⏱️ Temps écoulé. Suppression annulée.");
      });
  }
};
