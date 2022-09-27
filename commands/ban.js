const { SlashCommandBuilder, PermissionsFlagBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setNameLocalizations({
			de: 'verbieten',
			es: 'prohibir',
			fr: 'interdire',
		})
		.setDescription('This command bans a user from the server')
		.setDescriptionLocalizations({
			de: 'Dieser Befehl verbannt einen Benutzer vom Server',
			es: 'Este comando prohíbe a un/una usuario del servidor',
			fr: 'Cette commande bannit un utilisateur du serveur',
		})
		.addUserOption(opt =>
			opt.setName('user')
				.setNameLocalizations({
					de: 'Benutzer/Benutzerin',
					es: 'usuario/usuaria',
					fr: 'utilisateur/utilisatrice',
				})
				.setDescription('the user you want to ban')
				.setDescriptionLocalizations({
					de: 'den Benutzer, den Sie sperren möchten',
					es: 'El usuario/usuaria que quieres prohibir',
					fr: `l'utilisateur que vous souhaitez bannir`,
				})
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionsFlagBits.BanMembers),
	async execute(interaction, client) {
		const user = interaction.options.getUser('user');
		const userm = interaction.options.getMember('user');
		const userUnmanagableErrorLocale = {
			de: `Es tut uns leid, aber Sie können ${user} nicht sperren, sie haben mehr Berechtigungen als SherbertBot, bitte versuchen Sie es erneut`,
			es: `Lo sentimos, pero no puede prohibir ${user}, tienen más permisos que SherbertBot, intente nuevamente`,
			fr: `Nous sommes désolés, mais vous ne pouvez pas bannir ${user}, ils ont plus d'autorisations que SherbertBot, veuillez réessayer`,
		};
		const userBannedSelfErrorLocale = {
			de: 'Es tut uns leid, aber Sie können sich nicht selbst sperren, bitte versuchen Sie es erneut',
			es: 'Lo sentimos, pero no puedes prohibirte a ti mismo, inténtalo de nuevo.',
			fr: 'Nous sommes désolés, mais vous ne pouvez pas vous bannir, veuillez réessayer',
		};
		const userBannedSBErrorLocale = {
			de: 'Es tut uns leid, aber Sie können SherbertBot nicht sperren, bitte versuchen Sie es erneut',
			es: 'Lo sentimos, pero no puede prohibir SherbertBot, intente nuevamente',
			fr: 'Nous sommes désolés, mais vous ne pouvez pas bannir SherbertBot, veuillez réessayer',
		};
		const userBannedNonGuildMemberErrorLocale = {
			de: 'Es tut uns leid, aber Sie können keinen Benutzer sperren, der nicht Teil dieser Gilde ist. Bitte versuchen Sie es erneut',
			es: 'Lo sentimos, pero no puedes banear a un usuario que no es parte de este gremio, inténtalo de nuevo',
			fr: 'Nous sommes désolés, mais vous ne pouvez pas bannir un utilisateur qui ne fait pas partie de cette guilde, veuillez réessayer',
		};
		const userNotBannableMemberErrorLocale = {
			de: `Es tut uns leid, aber Sie können ${user} nicht sperren, sie können nicht von SherbertBot gebannt werden, bitte versuchen Sie es erneut`,
			es: `Lo sentimos, pero no puede prohibir a ${user}, SherbertBot no los puede prohibir, inténtelo de nuevo`,
			fr: `Nous sommes désolés, mais vous ne pouvez pas bannir ${user}, ils ne peuvent pas être bannis par SherbertBot, veuillez réessayer`,
		};
		const userBannedLocale = {
			de: `${user} wurde erfolgreich von ${interaction.guild.name} gesperrt`,
			es: `${user} ha sido expulsado con éxito de ${interaction.guild.name}`,
			fr: `${user} a été banni avec succès de ${interaction.guild.name}`,
		}
		if (!userm.manageable) {
			await interaction.reply({ content: userUnmanagableErrorLocale[interaction.locale] ?? `Were sorry, but you cannot ban ${user}, they have more permissions then SherbertBot, please try again`, ephemeral: true });
			return 1;
		}
		else if (interaction.user.id === user.id) {
			await interaction.reply({ content: userBannedSelfErrorLocale[interaction.locale] ?? 'Were sorry, but you cannot ban yourself, please try again', ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (client.user.id === user.id) {
			await interaction.reply({ content: userBannedSBErrorLocale[interaction.locale] ?? 'Were sorry, but you cannot ban SherbertBot, please try again', ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (userm === null) {
			await interaction.reply({ content: userBannedNonGuildMemberErrorLocale[interaction.locale] ?? 'Were sorry, but you cannot ban a user thats not part of this guild, please try again', ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (!userm.bannable) {
			await interaction.reply({ content: userNotBannableMemberErrorLocale[interaction.locale] ?? `Were sorry, but you cannot ban ${user}, they are not bannable by SherbertBot, please try again`, ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else {

			interaction.guild.members.ban(user);
			await interaction.reply({ content: userBannedLocale[interaction.locale] ?? `${user} has been successfully banned from ${interaction.guild.name}`, ephemeral: true })
				.catch(console.error);
		}

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};