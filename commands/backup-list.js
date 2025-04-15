const fs = require("fs");
const path = require("path");

module.exports = {
  name: "backup-list",
  description: "Affiche la liste des backups disponibles.",
  async execute(message, args) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("Tu dois être administrateur pour utiliser cette commande.");
    }

    const backupFolder = path.join(__dirname, "../backups");

    if (!fs.existsSync(backupFolder)) {
      return message.reply("Aucun dossier de backup trouvé.");
    }

    const files = fs.readdirSync(backupFolder).filter(file => file.endsWith(".json"));

    if (files.length === 0) {
      return message.reply("Il n'y a aucun backup enregistré.");
    }

    let list = "**📁 Backups enregistrés :**\n";
    files.forEach((file, index) => {
      list += `\`${index + 1}\` - ${file}\n`;
    });

    message.channel.send(list);
  }
};
