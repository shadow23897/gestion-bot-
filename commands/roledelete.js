module.exports = {
    name: "roledelete",
    description: "Supprime un rôle. Utilisation : +roledelete @rôle",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageRoles")) {
        return message.reply("Tu n’as pas la permission de supprimer des rôles !");
      }
  
      const role = message.mentions.roles.first();
  
      if (!role) {
        return message.reply("Tu dois mentionner un rôle à supprimer. Exemple : `+roledelete @VIP`");
      }
  
      if (!role.editable) {
        return message.reply("Je ne peux pas supprimer ce rôle. Il est peut-être au-dessus de mon rôle dans la hiérarchie.");
      }
  
      try {
        await role.delete(`Supprimé par ${message.author.tag}`);
        message.channel.send(`🗑️ Le rôle **${role.name}** a été supprimé.`);
      } catch (error) {
        console.error(error);
        message.reply("Une erreur est survenue lors de la suppression du rôle.");
      }
    }
  };
  