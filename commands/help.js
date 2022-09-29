const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { embedColor, embedAuthorName } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('The help app for Sherbertbot'),
	async execute(interaction, client) {
		const SherbertBotVersion = '1.0.0';
		const embedAuthor = 'SherbertBot';
		const row1 = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('helpselect')
					.setPlaceholder('Please select a utility command to view')
					.addOptions(
						{
							label: 'command list',
							description: 'Get a list of Sherbert Bots commands',
							value: 'cmdlist',
						},
						{
							label: '/help',
							description: 'Get information on the help command',
							value: 'help',
						},
						{
							label: '/ping',
							description: 'Get information on the ping command',
							value: 'ping',
						},
						{
							label: '/ban',
							description: 'Get information on the ban command',
							value: 'ban',
						},
						{
							label: '/unban',
							description: 'Get information on the unban command',
							value: 'unban',
						},
						{
							label: '/serverinfo',
							description: 'Get information on the serverinfo command',
							value: 'serverinfo',
						},
						{
							label: '/userinfo',
							description: 'Get information on the userinfo command',
							value: 'userinfo',
						},
						{
							label: '/kick',
							description: 'Get information on the kick command',
							value: 'kick',
						},
						{
							label: '/addrole',
							description: 'Get information on the addrole command',
							value: 'addrole',
						},
						{
							label: '/createrole',
							description: 'Get information on the createrole command',
							value: 'createrole',
						},
						{
							label: 'Back to main menu',
							description: 'Go back to the main menu of the help app',
							value: 'back-to-help',
						},
					),
			);

		const row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('utils')
					.setLabel('Utility Commands')
					.setStyle(ButtonStyle.Secondary),
			);


		const homeEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('Help')
			.setAuthor({ name: embedAuthor })
			.setDescription('Help app:\n Welcome to SherbertBots help app, please select a category you want help on!')
			.setTimestamp()
			.setFooter({ text: `${embedAuthor} version ${SherbertBotVersion}` });

		// defines the command list embeded message
		const utilListEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('Utilites command list')
			.setAuthor({ name: embedAuthor })
			.setDescription('Here\'s a list of SherbertBots commands in the utilities category\n1. /ping - gives you the ping of SherbertBot (developer command)\n2. /serverinfo - gives you information about the server\n3. /userinfo - gives you information about a user\n4. /help - this command\n5. /ban - bans a user from the server\n6. /unban - unbans a user from the server\n7. /kick - kick a user from the server\n8. /addrole - gives a user a role\n9. /createrole - creates a role')
			.addFields(
				{ name: '\u200B', value: 'use the selection box below to view info about a command' },
			)
			.setTimestamp()
			.setFooter({ text: `${embedAuthor} version ${SherbertBotVersion}` });

		class SherbertBotEmbedHelpPage {
			constructor(cmdname, usage, args, info, addedin) {
				const helpInfoEmbed = new EmbedBuilder()
					.setColor(embedColor)
					.setTitle(`${cmdname} command`)
					.setAuthor({ name: embedAuthorName })
					.setDescription(`Info on the ${cmdname} command\nUsage: ${usage}\nArguments: ${args}\nInfo: ${info}\nAdded in: ${addedin}`)
					.setTimestamp();
		
				return helpInfoEmbed;
			}
		}

		const pingInfoEmbed = new SherbertBotEmbedHelpPage('ping', 'type /ping', 'None', 'Note: if you arent a developer or dont know technology very well, this command isnt for you, if you got here by accident, just ignore this message and carry on with you day. Ping is a command thats built into SherbertBot for the sake of performance measurement. The command measures how long it takes for SherbertBot to communicate with discord', 'SherbertBot V1.0.0');

		const helpInfoEmbed = new SherbertBotEmbedHelpPage('help', 'type /help', 'None', 'Help is a command thats built into SherbertBot for helping users to figure out what can command does what and how to use it. /help can send info about a command if you select the command after selecting a category or give you a command list if no command is selected', 'Sherbert V1.0.0');

		const serverinfInfoEmbed = new SherbertBotEmbedHelpPage('serverinfo', 'type /serverinfo', 'None', 'serverinfo is a command thats built into SherbertBot for helping users find information about the server there in and admins to obtain statistics about there servers', 'SherbertBot V1.0.0');

		const userinfInfoEmbed = new SherbertBotEmbedHelpPage('userinfo', 'type /userinfo and in the "user" option, type the user you want info about', 'one argument', 'userinfo is a command thats built into SherbertBot for helping users find information about other users', 'SherbertBot V1.0.0');
		
		const banInfoEmbed = new SherbertBotEmbedHelpPage('ban', 'type /ban and in the "user" option, type the user you want to ban from the server, and you can optionally, in the "reason" option, type why you are banning them', 'one required argument and one optional argument', ':rotating_light: Warning :rotating_light: this action will prevent the user from coming back into the server unless you unban them!\n\n ban is a command thats built into SherbertBot for helping admins maintain order in there servers through discord banning system, once a user has been banned, they cannot join back into the server unless the ban is removed, which can be done by using the /unban command, you CAN NOT ban SherbertBot or anyone with administrator privileges', 'SherbertBot V1.0.0');

		const unbanInfoEmbed = new SherbertBotEmbedHelpPage('unban', 'type /unban and in the "user" option, type the user you want to unban from the server', 'one argument', ':rotating_light: Warning :rotating_light: this action will allow the user to come back to the server unless there banned again!\n\n unban is a command thats built into SherbertBot for helping admins maintain order in there servers through discord banning system, this the second addition to SherbertBots moderation system banning commands, use this command to allow banned users back into your server', 'SherbertBot V1.0.0');

		const kickInfoEmbed = new SherbertBotEmbedHelpPage('kick', 'type /kick and in the "user" option, type the user you want to kick from the server, and optionally, in the "reason" option, type why you you are kicking them', 'one required argument and one optional argument', ':rotating_light: Warning :rotating_light: this action will remove the user from the server, all users who have not friended this person will not be able to chat with them!\n\n kick is a command thats built into SherbertBot for helping admins maintain order in there servers through discord kicking system, this the thrid addition to SherbertBots moderation system', 'SherbertBot V1.0.0');

		const addroleInfoEmbed = new SherbertBotEmbedHelpPage('addrole', 'type /addrole and in the "user" option, type the user you want to give a role too, and in the "role" option, type the role you want to give and in the "reason" option you can say why you are giving your user that role', 'two required arguments and one optional argument', 'addrole is a command thats built into SherbertBot for helping admins by allowing them to easily give roles to users, however, this command with not work with any command that is above its role place', 'SherbertBot V1.0.0')

		const createroleInfoEmbed = new SherbertBotEmbedHelpPage('createrole', 'type /createrole and in the "name" option, type the name of the role you want to create', 'one argument', 'createrole is a command thats built into SherbertBot for helping admins by allowing them to easily create roles for users', 'SherbertBot V1.0.0')
		
		
		await interaction.reply({ embeds: [homeEmbed], components: [row2], ephemeral: true });

		client.on('interactionCreate', async inter => {
			if (!inter.isButton()) return;
			if (inter.customId === 'utils') {
				await inter.update({ embeds: [utilListEmbed], components: [row1], ephemeral: true });
			}
			return 0;
		})

		client.on('interactionCreate', async inter => {
			if (!inter.isSelectMenu()) return;

			switch(inter.values[0]) {
				case 'cmdlist':
					await inter.update({ embeds: [utilListEmbed], components: [row1], ephemeral: true });
					break;
				case 'ban':
					await inter.update({ embeds: [banInfoEmbed], components: [row1], ephemeral: true });
					break;
				case 'unban':
					await inter.update({ embeds: [unbanInfoEmbed], components: [row1], ephemeral: true });
					break;
				case 'ping':
					await inter.update({ embeds: [pingInfoEmbed], components: [row1], ephemeral: true });
					break;
				case 'help':
					await inter.update({ embeds: [helpInfoEmbed], components: [row1], ephemeral: true });
					break;
				case 'serverinfo':
					await inter.update({ embeds: [serverinfInfoEmbed], components: [row1], ephemeral: true });
					break;
				case 'userinfo':
					await inter.update({ embeds: [userinfInfoEmbed], components: [row1], ephemeral: true });
					break;
				case 'kick':
					await inter.update({ embeds: [kickInfoEmbed], components: [row1], ephemeral: true });
					break;
				case 'addrole':
					await inter.update({ embeds: [addroleInfoEmbed], components: [row1], ephemeral: true });
					break;
				case 'createrole':
					await inter.update({ embeds: [createroleInfoEmbed], components: [row1], ephemeral: true });
					break;
				case 'back-to-menu':
					await inter.update({ embeds: [homeEmbed], components: [row2], ephemeral: true });
					break;
				default:
					break;
			}

			/*
			
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
			else if (inter.values[0] === 'addrole') {
				await inter.update({ embeds: [addroleInfoEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'createrole') {
				await inter.update({ embeds: [createroleInfoEmbed], components: [row1] });
				return 0;
			}
			else if (inter.values[0] === 'back-to-help') {
				await inter.update({ embeds: [homeEmbed], components: [row2] });
				buttonCollector(interaction);
				return 0;
			}
			else if (inter.values[0] === 'exit-help') {
				interaction.deleteReply();
				return 0;
			}
			*/
		});

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};