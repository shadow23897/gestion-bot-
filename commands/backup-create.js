const fs = require("fs");
const path = require("path");

module.exports = {
  name: "backup-create",
  description: "Crée une sauvegarde du serveur (structure des rôles et salons).",
  async execute(message, args) {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("Tu dois être administrateur pour utiliser cette commande.");
    }

    const guild = message.guild;

    const backupData = {
      name: guild.name,
      id: guild.id,
      createdAt: guild.createdAt,
      roles: [],
      channels: []
    };

    
    guild.roles.cache
      .filter(role => !role.managed && role.name !== "@everyone")
      .forEach(role => {
        backupData.roles.push({
          name: role.name,
          color: role.hexColor,
          hoist: role.hoist,
          permissions: role.permissions.bitfield,
          mentionable: role.mentionable,
          position: role.position
        });
      });

    
    guild.channels.cache
      .sort((a, b) => a.position - b.position)
      .forEach(channel => {
        backupData.channels.push({
          name: channel.name,
          type: channel.type,
          parent: channel.parent?.name || null,
          position: channel.position,
          topic: channel.topic || null,
          nsfw: channel.nsfw || false,
          rateLimitPerUser: channel.rateLimitPerUser || 0
        });
      });

    const backupFolder = path.join(__dirname, "../backups");
    if (!fs.existsSync(backupFolder)) fs.mkdirSync(backupFolder);

    const filePath = path.join(backupFolder, `${guild.id}_${Date.now()}.json`);
    fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2));

    message.channel.send("✅ Sauvegarde du serveur créée avec succès !");
  }
};
