const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moderator')
		.setDescription('SherbertBots moderation commands')
		.addSubcommand(subcommand =>
			subcommand
				.setName('ban')
				.setNameLocalizations({
					'de': 'verbot',
					'es-ES': 'prohibir',
					'fr': 'interdire',
				})
				.setDescription('this command bans a user from the server')
				.setDescriptionLocalizations({
					'de': 'dieser Befehl verbannt einen Benutzer vom Server',
					'es-ES': 'este comando prohíbe a un/una usuario del servidor',
					'fr': 'cette commande bannit un utilisateur du serveur',
				})
				.addUserOption(opt =>
					opt.setName('user')
						.setNameLocalizations({
							'de': 'benutzer',
							'es-ES': 'persona',
							'fr': 'utilisateur',
						})
						.setDescription('the user you want to ban')
						.setDescriptionLocalizations({
							'de': 'den Benutzer, den Sie sperren möchten',
							'es-ES': 'el usuario/usuaria que quieres prohibir',
							'fr': 'lutilisateur que vous souhaitez bannir',
						})
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('unban')
				.setDescription('Unbans a user from the server')
				.addUserOption(opt =>
					opt.setName('user')
						.setDescription('the user you want to unban')
						.setRequired(true)))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction, client) {
		const user = interaction.options.getUser('user');
		const userm = interaction.options.getMember('user');
		const userUnmanagableErrorLocale = {
			'de': `Es tut uns leid, aber Sie können ${user} nicht sperren, sie haben mehr Berechtigungen als SherbertBot, bitte versuchen Sie es erneut`,
			'es-ES': `Lo sentimos, pero no puede prohibir ${user}, tienen más permisos que SherbertBot, intente nuevamente`,
			'fr': `Nous sommes désolés, mais vous ne pouvez pas bannir ${user}, ils ont plus d'autorisations que SherbertBot, veuillez réessayer`,
		};
		const userBannedSelfErrorLocale = {
			'de': 'Es tut uns leid, aber Sie können sich nicht selbst sperren, bitte versuchen Sie es erneut',
			'es-ES': 'Lo sentimos, pero no puedes prohibirte a ti mismo, inténtalo de nuevo.',
			'fr': 'Nous sommes désolés, mais vous ne pouvez pas vous bannir, veuillez réessayer',
		};
		const userBannedSBErrorLocale = {
			'de': 'Es tut uns leid, aber Sie können SherbertBot nicht sperren, bitte versuchen Sie es erneut',
			'es-ES': 'Lo sentimos, pero no puede prohibir SherbertBot, intente nuevamente',
			'fr': 'Nous sommes désolés, mais vous ne pouvez pas bannir SherbertBot, veuillez réessayer',
		};
		const userBannedNonGuildMemberErrorLocale = {
			'de': 'Es tut uns leid, aber Sie können keinen Benutzer sperren, der nicht Teil dieser Gilde ist. Bitte versuchen Sie es erneut',
			'es-ES': 'Lo sentimos, pero no puedes banear a un usuario que no es parte de este gremio, inténtalo de nuevo',
			'fr': 'Nous sommes désolés, mais vous ne pouvez pas bannir un utilisateur qui ne fait pas partie de cette guilde, veuillez réessayer',
		};
		const userNotBannableMemberErrorLocale = {
			'de': `Es tut uns leid, aber Sie können ${user} nicht sperren, sie können nicht von SherbertBot gebannt werden, bitte versuchen Sie es erneut`,
			'es-ES': `Lo sentimos, pero no puede prohibir a ${user}, SherbertBot no los puede prohibir, inténtelo de nuevo`,
			'fr': `Nous sommes désolés, mais vous ne pouvez pas bannir ${user}, ils ne peuvent pas être bannis par SherbertBot, veuillez réessayer`,
		};
		const userBannedLocale = {
			'de': `${user} wurde erfolgreich von ${interaction.guild.name} gesperrt`,
			'es-ES': `${user} ha sido expulsado con éxito de ${interaction.guild.name}`,
			'fr': `${user} a été banni avec succès de ${interaction.guild.name}`,
		};

		if (interaction.options.getSubcommand() === 'ban') {

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
		}
		else if (interaction.options.getSubcommand() === 'unban') {
			try {
				await interaction.guild.bans.fetch(user);
			}
			catch (error) {
				if (error.code === 10026) {
					await interaction.reply({ content: 'Were sorry, but you cannot unban a user that isnt banned, please try again', ephemeral: true });
					return 1;
				}
				else {
					await interaction.reply({ content: 'Were sorry, but a unknown error occured while trying to unban the user, please try again', ephemeral: true });
					return 1;
				}
			}
			if (interaction.user.id === user.id) {
				await interaction.reply({ content: 'Were sorry, but you cannot unban yourself, please try again', ephemeral: true });
				return 1;
			}
			else if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
				await interaction.reply({ content: 'Were sorry, but you cannot use the unban command, you do not have the permissions, please try again', ephemeral: true });
				return 1;
			}
			else if (client.user.id === user.id) {
				await interaction.reply({ content: 'Were sorry, but you cannot unban SherbertBot, as SherbertBot cannot be banned, please try again', ephemeral: true });
				return 1;
			}
			else {
				interaction.guild.members.unban(user);
				await interaction.reply({ content: `${user} has been successfully unbanned from ${interaction.guild.name}`, ephemeral: true });
			}
		}


		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};