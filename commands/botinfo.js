const { version } = require("discord.js");
const os = require("os");

module.exports = {
  name: "botinfo",
  description: "Affiche les informations sur le bot.",
  execute(message, args) {
    const uptime = process.uptime();
    const formatTime = (s) => {
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = Math.floor(s % 60);
      return `${h}h ${m}m ${sec}s`;
    };

    const botInfo = `
**Nom du bot :** ${message.client.user.username}
**ID :** ${message.client.user.id}
**Créé le :** ${message.client.user.createdAt.toDateString()}
**En ligne depuis :** ${formatTime(uptime)}
**Serveurs :** ${message.client.guilds.cache.size}
**Utilisateurs :** ${message.client.users.cache.size}
**Version Discord.js :** v${version}
**Plateforme :** ${os.platform()} (${os.arch()})
    `;

    message.channel.send(botInfo);
  }
};
