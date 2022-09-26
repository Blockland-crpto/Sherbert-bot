const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setNameLocalizations({
			de: 'hilfe',
			es: 'ayuda',
			fr: 'aider',
		})
		.setDescription('this command is were you can get info on sherbert bots commands')
		.setDescriptionLocalizations({
			de: 'In diesem Befehl erhalten Sie Informationen zu Sherbert-Bots-Befehlen',
			es: 'este comando es donde puede obtener información sobre los comandos de los bots sherbert',
			fr: `cette commande est l'endroit où vous pouvez obtenir des informations sur les commandes de sherbert bots`,
		}),
	async execute(interaction, client) {
		const embedColor = '#7F8C8D';
		const SherbertBotVersion = '1.0.0';
		const embedAuthor = 'SherbertBot';
		const placeholderLocale = {
			de: 'Bitte wählen Sie einen Dienstprogrammbefehl aus, um ihn anzuzeigen',
			esES: 'Seleccione un comando de utilidad para ver',
			fr: `Veuillez sélectionner une commande d'utilitaire pour afficher`,
		};
		const commandListLocale = {
			de: 'Befehlsliste',
			esES: 'lista de comandos',
			fr: 'liste de commandes',
		};
		const commandListDescSelectLocale = {
			de: 'Holen Sie sich eine Liste von Sherbert Bots-Befehlen',
			es: 'Obtenga una lista de comandos de Sherbert Bots',
			fr: 'Obtenir une liste des commandes Sherbert Bots',
		};
		const helpSelectDescLocale = {
			de: 'Informieren Sie sich über den Hilfebefehl',
			es: 'Obtener información sobre el comando de ayuda',
			fr: `Obtenir des informations sur la commande d'aide`,
		};
		const pingSelectDescLocale = {
			de: 'Informieren Sie sich über den Ping-Befehl',
			es: 'Obtener información sobre el comando ping',
			fr: 'Obtenir des informations sur la commande ping',
		};
		const banSelectLabelLocale = {
			de: '/verbieten',
			es: '/prohibir',
			fr: '/interdire',
		};
		const banSelectDescLocale = {
			de: 'Informieren Sie sich über den verbieten-Befehl',
			es: 'Obtener información sobre el comando de prohibir',
			fr: `Obtenir des informations sur la commande d'interdiction`,
		};
		const unbanSelectDescLocale = {
			de: 'Informieren Sie sich über den Unban-Befehl',
			es: 'Obtener información sobre el comando de desbaneo',
			fr: `Obtenir des informations sur la commande unban`,
		};
		const serverinfoSelectDescLocale = {
			de: 'Rufen Sie Informationen zum Befehl serverinfo ab',
			es: 'Obtener información sobre el comando serverinfo',
			fr: 'Obtenir des informations sur la commande serverinfo',
		};
		const userinfoSelectDescLocale = {
			de: 'Rufen Sie Informationen über den Befehl userinfo ab',
			es: 'Obtener información sobre el comando userinfo',
			fr: 'Obtenir des informations sur la commande userinfo',
		};
		const kickSelectDescLocale = {
			de: 'Informieren Sie sich über den Kick-Befehl',
			es: 'Obtener información sobre el comando de patada',
			fr: 'Obtenir des informations sur la commande kick',
		};
		const backtomainSelectLocale = {
			de: 'Zurück zum Hauptmenü',
			es: 'Volver al menú principal',
			fr: 'Retour au menu principal',
		};
		const backtomainSelectDescLocale = {
			de: 'Gehen Sie zurück zum Hauptmenü der Hilfe-App',
			es: 'Volver al menú principal de la aplicación de ayuda',
			fr: `Revenir au menu principal de l'application d'aide`,
		};
		const exithelpSelectLocale = {
			de: 'Hilfe schließen',
			es: 'Cerrar ayuda',
			fr: `Fermer l'aide`
		};
		const exithelpSelectDescLocale = {
			de: 'Beenden Sie die Hilfe-App',
			es: 'Salir de la aplicación de ayuda',
			fr: `Quitter l'application d'aide`
		};
		const closehelpButtonLabelLocale = {
			de: 'Hilfe schließen',
			es: 'Cerrar Ayuda',
			fr: `Fermer l'aide`,
		};
		const utilshelpButtonLabelLocale = {
			de: 'Utility-Befehle',
			es: 'Comandos de utilidad',
			fr: 'Commandes utilitaires',
		};
		const homeEmbedTitleLocale = {
			de: 'Hilfe',
			es: 'Ayuda',
			fr: 'Aider'.
		}
		const homeEmbedDescLocale = {
			de: 'Hilfe-App:\n Willkommen bei der SherbertBots-Hilfe-App. Bitte wählen Sie eine Kategorie aus, zu der Sie Hilfe wünschen!',
			es: 'Aplicación de ayuda:\n Bienvenido a la aplicación de ayuda de SherbertBots, seleccione una categoría sobre la que desee obtener ayuda.',
			fr: `Application d'aide : \n Bienvenue dans l'application d'aide de SherbertBots, veuillez sélectionner une catégorie pour laquelle vous souhaitez obtenir de l'aide !`
		};
		const versionFootLocale = {
			de: `${embedAuthor}-version-${SherbertBotVersion}`,
			es: `${embedAuthor} versión ${SherbertBotVersion}`,
			fr: `${embedAuthor} version ${SherbertBotVersion}`,
		};
		const utilListTitleLocale = {
			de: 'Befehlsliste der Dienstprogramme',
			es: 'Lista de comandos de utilidades',
			fr: 'Liste des commandes des utilitaires',
		};
		const utilListDescLocale = {
			de: 'Hier ist eine Liste von SherbertBots-Befehlen in der Kategorie Dienstprogramme',
			es: 'Aquí hay una lista de comandos de SherbertBots en la categoría de utilidades',
			fr: 'Voici une liste des commandes SherbertBots dans la catégorie utilitaires',
		}
		const utilListEmbedPingInfoLocale = {
			de: 'vous donne le ping de SherbertBot (commande développeur)',
			es: 'te da el ping de SherbertBot (comando de desarrollador)',
			fr: 'vous donne le ping de SherbertBot (commande développeur)',
		};
		const utilListEmbedServerinfoInfoLocale = {
			de: 'gibt Ihnen Informationen über den Server',
			es: 'te da información sobre el servidor',
			fr: 'vous donne des informations sur le serveur',
		};
		const utilListEmbedUserinfoInfoLocale = {
			de: 'gibt Ihnen Informationen über einen Benutzer',
			es: 'te da información sobre un usuario',
			fr: 'vous donne des informations sur un utilisateur',
		};
		const utilListEmbedHelpInfoLocale = {
			de: 'dieser Befehl',
			es: 'este comando',
			fr: 'cette commande',
		};
		const utilListEmbedBanListLocale = {
			de: '5. /verbieten',
			es: '5. /prohibir',
			fr: '5. /interdire',
		};
		const utilListEmbedBanInfoLocale = {
			de: 'verbannt einen Benutzer vom Server',
			es: 'Prohíbe a un/una usuario del servidor',
			fr: 'bannit un utilisateur du serveur',
		};
		const utilListEmbedUnbanInfoLocale = {
			de: 'Entsperrt einen Benutzer vom Server',
			es: 'Desbloquea a un/una usuario del servidor.',
			fr: 'débanni un utilisateur du serveur',
		};
		const utilListEmbedKickInfoLocale = {
			de: 'Kicken Sie einen Benutzer vom Server',
			es: 'expulsar a un usuario del servidor',
			fr: 'expulser un utilisateur du serveur',
		};
		const selectRemind = {
			de: 'Verwenden Sie das Auswahlfeld unten, um Informationen zu einem Befehl anzuzeigen',
			es: 'use el cuadro de selección a continuación para ver información sobre un comando',
			fr: 'utilisez la zone de sélection ci-dessous pour afficher les informations sur une commande',
		};
		const commandEmbedCategoryUsageLocale = {
			de: 'Verwendungszweck',
			es: 'Uso',
			fr: 'Usage',
		};
		const commandEmbedCategoryArgsLocale = {
			de: 'Argumente',
			es: 'Argumentos',
			fr: 'Arguments',
		};
		const commandEmbedCategoryInfoLocale = {
			de: 'Die Info',
			es: 'Información',
			fr: 'Info',
		};
		const pingInfoEmbedTitleLocale = {
			de: 'Ping-Befehl',
			es: 'Comando de ping',
			fr: 'Commande ping',
		};
		const pingInfoEmbedDescLocale = {
			de: 'Info zum Ping-Befehl',
			es: 'Información sobre el comando ping',
			fr: 'Infos sur la commande ping',
		};
		const pingInfoUsageLocale = {
			de: 'tippe /ping',
			es: 'tipo /ping',
			fr: 'taper /ping'
		};

		const row1 = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('helpselect')
					.setPlaceholder(placeholderLocale[interaction.locale] ?? 'Please select a utility command to view')
					.addOptions(
						{
							label: commandListLocale[interaction.locale] ?? 'command list',
							description: commandListDescSelectLocale[interaction.locale] ?? 'Get a list of Sherbert Bots commands',
							value: 'cmdlist',
						},
						{
							label: '/help',
							description: helpSelectDescLocale[interaction.locale] ?? 'Get information on the help command',
							value: 'help',
						},
						{
							label: '/ping',
							description: pingSelectDescLocale[interaction.locale] ?? 'Get information on the ping command',
							value: 'ping',
						},
						{
							label: banSelectLabelLocale[interaction.locale] ?? '/ban',
							description: banSelectDescLocale[interaction.locale] ?? 'Get information on the ban command',
							value: 'ban',
						},
						{
							label: '/unban',
							description: unbanSelectDescLocale[interaction.locale] ?? 'Get information on the unban command',
							value: 'unban',
						},
						{
							label: '/serverinfo',
							description: serverinfoSelectDescLocale[interaction.locale] ?? 'Get information on the serverinfo command',
							value: 'serverinfo',
						},
						{
							label: '/userinfo',
							description: userinfoSelectDescLocale[interaction.locale] ?? 'Get information on the userinfo command',
							value: 'userinfo',
						},
						{
							label: '/kick',
							description: kickSelectDescLocale[interaction.locale] ?? 'Get information on the kick command',
							value: 'kick',
						},
						{
							label: backtomainSelectLocale[interaction.locale] ?? 'Back to main menu',
							description: backtomainSelectDescLocale[interaction.locale] ?? 'Go back to the main menu of the help app',
							value: 'back-to-help',
						},
						{
							label: exithelpSelectLocale[interaction.locale] ?? 'Close help',
							description: exithelpSelectDescLocale[interaction.locale] ?? 'Exit the help app',
							value: 'exit-help',
						},
					),
			);

		const row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('closehelp')
					.setLabel(closehelpButtonLabelLocale[interaction.locale] ?? 'Close Help')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId('utils')
					.setLabel(utilshelpButtonLabelLocale[interaction.locale] ?? 'Utility Commands')
					.setStyle(ButtonStyle.Secondary),
			);

		const homeEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(homeEmbedTitleLocale[interaction.locale] ?? 'Help')
			.setAuthor({ name: embedAuthor })
			.setDescription(homeEmbedDescLocale[interaction.locale] ?? 'Help app:\n Welcome to SherbertBots help app, please select a category you want help on!')
			.setTimestamp()
			.setFooter({ text: versionFootLocale[interaction.locale] ?? `${embedAuthor} version ${SherbertBotVersion}` });

		// defines the command list embeded message
		const utilListEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(utilListTitleLocale[interaction.locale] ?? 'Utilites command list')
			.setAuthor({ name: embedAuthor })
			.setDescription(utilListDescLocale[interaction.locale] ?? `Here's a list of SherbertBots commands in the utilities category`)
			.addFields(
				{ name: '1. /ping', value: utilListEmbedPingInfoLocale[interaction.locale] ?? 'gives you the ping of SherbertBot (developer command)' },
				{ name: '2. /serverinfo', value: utilListEmbedServerinfoInfoLocale[interaction.locale] ?? 'gives you information about the server' },
				{ name: '3. /userinfo', value: utilListEmbedUserinfoInfoLocale[interaction.locale] ?? 'gives you information about a user' },
				{ name: '4. /help', value: utilListEmbedHelpInfoLocale[interaction.locale] ?? 'this command' },
				{ name: utilListEmbedBanListLocale[interaction.locale] ?? '5. /ban', value: utilListEmbedBanInfoLocale[interaction.locale] ?? 'bans a user from the server' },
				{ name: '6. /unban', value: utilListEmbedUnbanInfoLocale[interaction.locale] ?? 'unbans a user from the server' },
				{ name: '7. /kick', value: utilListEmbedKickInfoLocale[interaction.locale] ?? 'kick a user from the server' },
				{ name: '\u200B', value: selectRemind[interaction.locale] ?? 'use the selection box below to view info about a command' },
			)
			.setTimestamp()
			.setFooter({ text: versionFootLocale[interaction.locale] ?? `${embedAuthor} version ${SherbertBotVersion}` });

		// defines pings embeded message
		const pingInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle(pingInfoEmbedTitleLocale[interaction.locale] ?? 'Ping command')
			.setAuthor({ name: embedAuthor })
			.setDescription(pingInfoEmbedDescLocale[interaction.locale] ?? 'Info on the ping command')
			.addFields(
				{ name: commandEmbedCategoryUsageLocale[interaction.locale] ?? 'Usage', value: pingInfoUsageLocale[interaction.locale] ?? 'type /ping' },
				{ name: commandEmbedCategoryArgsLocale[interaction.locale] ?? 'Arguments', value: 'None' },
				{ name: 'Info', value: 'Note: if you arent a developer or dont know technology very well, this command isnt for you, if you got here by accident, just ignore this message and carry on with you day. Ping is a command thats built into SherbertBot for the sake of performance measurement. The command measures how long it takes for SherbertBot to communicate with discord' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();

		// defines helps embeded message
		const helpInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('help command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the help command')
			.addFields(
				{ name: commandEmbedCategoryUsageLocale[interaction.locale] ?? 'Usage', value: 'type /help' },
				{ name: commandEmbedCategoryArgsLocale[interaction.locale] ?? 'Arguments', value: 'None' },
				{ name: 'Info', value: 'Help is a command thats built into SherbertBot for helping users to figure out what can command does what and how to use it. /help can send info about a command if you use the command option or give you a command list if no command is selected' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();

		// defines serverinfos embeded message
		const serverinfInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('serverinfo command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the serverinfo command')
			.addFields(
				{ name: commandEmbedCategoryUsageLocale[interaction.locale] ?? 'Usage', value: 'type /serverinfo' },
				{ name: commandEmbedCategoryArgsLocale[interaction.locale] ?? 'Arguments', value: 'no arguments' },
				{ name: 'Info', value: 'serverinfo is a command thats built into SherbertBot for helping users find information about the server there in and admins to obtain statistics about there servers' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();

		// defines userinfos embeded message
		const userinfInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('userinfo command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the userinfo command')
			.addFields(
				{ name: commandEmbedCategoryUsageLocale[interaction.locale] ?? 'Usage', value: 'type /userinfo and in the "user" option, type the user you want info about' },
				{ name: commandEmbedCategoryArgsLocale[interaction.locale] ?? 'Arguments', value: 'one argument' },
				{ name: 'Info', value: 'userinfo is a command thats built into SherbertBot for helping users find information about other users' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();

		// defines bans embeded message
		const banInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('ban command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the ban command')
			.addFields(
				{ name: commandEmbedCategoryUsageLocale[interaction.locale] ?? 'Usage', value: 'type /ban and in the "user" option, type the user you want to ban from the server' },
				{ name: ':rotating_light: Warning :rotating_light:', value: 'this action will prevent the user from coming back into the server unless you unban them!' },
				{ name: commandEmbedCategoryArgsLocale[interaction.locale] ?? 'Arguments', value: 'one argument' },
				{ name: 'Info', value: 'ban is a command thats built into SherbertBot for helping admins maintain order in there servers through discord banning system, once a user has been banned, they cannot join back into the server unless the ban is removed, which can be done by using the /unban command, you CAN NOT ban SherbertBot or anyone with administrator privileges' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();
		
		// defines the unban embedded message
		const unbanInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('unban command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the unban command')
			.addFields(
				{ name: commandEmbedCategoryUsageLocale[interaction.locale] ?? 'Usage', value: 'type /unban and in the "user" option, type the user you want to unban from the server' },
				{ name: ':rotating_light: Warning :rotating_light:', value: 'this action will allow the user to come back to the server unless there banned again!' },
				{ name: commandEmbedCategoryArgsLocale[interaction.locale] ?? 'Arguments', value: 'one argument' },
				{ name: 'Info', value: 'unban is a command thats built into SherbertBot for helping admins maintain order in there servers through discord banning system, this the second addition to SherbertBots moderation system banning commands, use this command to allow banned users back into your server ' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();

		// defines kick embeded message
		const kickInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('kick command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the kick command')
			.addFields(
				{ name: commandEmbedCategoryUsageLocale[interaction.locale] ?? 'Usage', value: 'type /kick and in the "user" option, type the user you want to kick from the server' },
				{ name: ':rotating_light: Warning :rotating_light:', value: 'this action will remove the user from the server, all users who have not friended this person will not be able to chat with them!' },
				{ name: commandEmbedCategoryArgsLocale[interaction.locale] ?? 'Arguments', value: 'one argument' },
				{ name: 'Info', value: 'kick is a command thats built into SherbertBot for helping admins maintain order in there servers through discord kicking system, this the thrid addition to SherbertBots moderation system' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();


		await interaction.reply({ embeds: [homeEmbed], components: [row3] });

		const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });

		collector.on('collect', i => {
			if (i.user.id === interaction.user.id) {
				if (i.customId === 'utils') {
					i.update({ embeds: [utilListEmbed], components: [row1] });
				}
				else if (i.customId === 'closehelp') {
					interaction.deleteReply();
				}
				return 0;
			}
			else {
				i.reply({ content: 'Were sorry but this app is not being used by you, please create your own help app by using the /help command', ephemeral: true });
				return 0;
			}
		});

		client.on('interactionCreate', async inter => {
			if (!inter.isSelectMenu()) return;

			if (!inter.user.id === interaction.user.id) {
				inter.reply({ content: 'Were sorry but this app is not being used by you, please create your own help app by using the /help command', ephemeral: true });
				return 0;
			}

			if (inter.values[0] === 'cmdlist') {
				await inter.update({ embeds: [utilListEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'ban') {
				await inter.update({ embeds: [banInfoEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'unban') {
				await inter.update({ embeds: [unbanInfoEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'ping') {
				await inter.update({ embeds: [pingInfoEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'help') {
				await inter.update({ embeds: [helpInfoEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'serverinfo') {
				await inter.update({ embeds: [serverinfInfoEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'userinfo') {
				await inter.update({ embeds: [userinfInfoEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'kick') {
				await inter.update({ embeds: [kickInfoEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'back-to-help') {
				await inter.update({ embeds: [homeEmbed], components: [row2] });
				return 0;
			}
			else if (inter.values[0] === 'exit-help') {
				interaction.deleteReply();
				return 0;
			}
			
		});

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};