const fs = require("fs");
const path = require("path");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Affiche la liste des commandes (avec pages si trop long).",
  async execute(message, args) {
    const commandFiles = fs.readdirSync(path.join(__dirname)).filter(file => file.endsWith(".js"));
    const commands = commandFiles.map(file => require(`./${file}`));

    const itemsPerPage = 10;
    const totalPages = Math.ceil(commands.length / itemsPerPage);
    let currentPage = 0;

    const generateEmbed = (page) => {
      const start = page * itemsPerPage;
      const end = start + itemsPerPage;
      const commandList = commands.slice(start, end).map(cmd => `• \`${cmd.name}\` - ${cmd.description}`).join("\n");

      return new EmbedBuilder()
        .setTitle("📖 Liste des commandes")
        .setDescription(commandList)
        .setFooter({ text: `Page ${page + 1} sur ${totalPages}` })
        .setColor("Blue");
    };

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("prev")
        .setLabel("◀️ Précédent")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("next")
        .setLabel("Suivant ▶️")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(totalPages <= 1)
    );

    const msg = await message.channel.send({
      embeds: [generateEmbed(currentPage)],
      components: [row]
    });

    const collector = msg.createMessageComponentCollector({
      filter: interaction => interaction.user.id === message.author.id,
      time: 60000
    });

    collector.on("collect", interaction => {
      if (interaction.customId === "next") currentPage++;
      else if (interaction.customId === "prev") currentPage--;

      row.components[0].setDisabled(currentPage === 0);
      row.components[1].setDisabled(currentPage >= totalPages - 1);

      interaction.update({
        embeds: [generateEmbed(currentPage)],
        components: [row]
      });
    });

    collector.on("end", () => {
      msg.edit({ components: [] }).catch(() => {});
    });
  }
};

