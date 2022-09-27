const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { embedColor } = require('../config.json');

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
							label: 'Back to main menu',
							description: 'Go back to the main menu of the help app',
							value: 'back-to-help',
						},
						{
							label: 'Close help',
							description: 'Exit the help app',
							value: 'exit-help',
						},
					),
			);

		const row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('closehelp')
					.setLabel('Close Help')
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId('utils')
					.setLabel('Utility Commands')
					.setStyle(ButtonStyle.Secondary),
			);

		async function buttonCollector(miniinteraction) {

			let collector = miniinteraction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });

			collector.on('collect', async i => {
				if (i.user.id === miniinteraction.user.id) {
					if (i.customId === 'utils') {
						await i.update({ embeds: [utilListEmbed], components: [row1] });
						collector = null;
					}
					else if (i.customId === 'closehelp') {
						await miniinteraction.deleteReply();
						collector = null;
					}
					return 0;
				}
				else {
					i.reply({ content: 'Were sorry but this app is not being used by you, please create your own help app by using the /help command', ephemeral: true });
					return 0;
				}
			});

			collector.on('end', async collected => {
				collector = null;
				miniinteraction.deleteReply();
				console.log(collected);
			});

			client.on('interactionCreate', async inter => {
				console.log(`${inter} has occured, closing buttons`);
				collector = null;
				return 0;
			});
		}

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
			.setDescription('Here\'s a list of SherbertBots commands in the utilities category')
			.addFields(
				{ name:	'1. /ping', value: 'gives you the ping of SherbertBot (developer command)' },
				{ name: '2. /serverinfo', value: 'gives you information about the server' },
				{ name: '3. /userinfo', value: 'gives you information about a user' },
				{ name: '4. /help', value: 'this command' },
				{ name: '5. /ban', value: 'bans a user from the server' },
				{ name: '6. /unban', value: 'unbans a user from the server' },
				{ name: '7. /kick', value: 'kick a user from the server' },
				{ name: '8. /addrole', value: 'gives a user a role' },
				{ name: '\u200B', value: 'use the selection box below to view info about a command' },
			)
			.setTimestamp()
			.setFooter({ text: `${embedAuthor} version ${SherbertBotVersion}` });

		// defines pings embeded message
		const pingInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('Ping command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the ping command')
			.addFields(
				{ name: 'Usage', value: 'type /ping' },
				{ name: 'Arguments', value: 'None' },
				{ name: 'info', value: 'Note: if you arent a developer or dont know technology very well, this command isnt for you, if you got here by accident, just ignore this message and carry on with you day. Ping is a command thats built into SherbertBot for the sake of performance measurement. The command measures how long it takes for SherbertBot to communicate with discord' },
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
				{ name: 'Usage', value: 'type /help' },
				{ name: 'Arguments', value: 'None' },
				{ name: 'info', value: 'Help is a command thats built into SherbertBot for helping users to figure out what can command does what and how to use it. /help can send info about a command if you use the command option or give you a command list if no command is selected' },
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
				{ name: 'Usage', value: 'type /serverinfo' },
				{ name: 'Arguments', value: 'no arguments' },
				{ name: 'info', value: 'serverinfo is a command thats built into SherbertBot for helping users find information about the server there in and admins to obtain statistics about there servers' },
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
				{ name: 'Usage', value: 'type /userinfo and in the "user" option, type the user you want info about' },
				{ name: 'Arguments', value: 'one argument' },
				{ name: 'info', value: 'userinfo is a command thats built into SherbertBot for helping users find information about other users' },
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
				{ name: 'Usage', value: 'type /ban and in the "user" option, type the user you want to ban from the server' },
				{ name: ':rotating_light: Warning :rotating_light:', value: 'this action will prevent the user from coming back into the server unless you unban them!' },
				{ name: 'Arguments', value: 'one argument' },
				{ name: 'info', value: 'ban is a command thats built into SherbertBot for helping admins maintain order in there servers through discord banning system, once a user has been banned, they cannot join back into the server unless the ban is removed, which can be done by using the /unban command, you CAN NOT ban SherbertBot or anyone with administrator privileges' },
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
				{ name: 'Usage', value: 'type /unban and in the "user" option, type the user you want to unban from the server' },
				{ name: ':rotating_light: Warning :rotating_light:', value: 'this action will allow the user to come back to the server unless there banned again!' },
				{ name: 'Arguments', value: 'one argument' },
				{ name: 'info', value: 'unban is a command thats built into SherbertBot for helping admins maintain order in there servers through discord banning system, this the second addition to SherbertBots moderation system banning commands, use this command to allow banned users back into your server ' },
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
				{ name: 'Usage', value: 'type /kick and in the "user" option, type the user you want to kick from the server' },
				{ name: ':rotating_light: Warning :rotating_light:', value: 'this action will remove the user from the server, all users who have not friended this person will not be able to chat with them!' },
				{ name: 'Arguments', value: 'one argument' },
				{ name: 'info', value: 'kick is a command thats built into SherbertBot for helping admins maintain order in there servers through discord kicking system, this the thrid addition to SherbertBots moderation system' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();

		// defines addrole embeded message
		const addroleInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('addrole command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the addrole command')
			.addFields(
				{ name: 'Usage', value: 'type /addrole and in the "user" option, type the user you want to give a role too, and in the "role" option, type the role you want to give and in the "reason" option you can say why you are giving your user that role' },
				{ name: 'Arguments', value: 'two required arguments and one optional argument' },
				{ name: 'info', value: 'addrole is a command thats built into SherbertBot for helping admins by allowing them to easily give roles to users, however, this command with not work with any command that is above its role place' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();


		await interaction.reply({ embeds: [homeEmbed], components: [row2] });

		buttonCollector(interaction);

		client.on('interactionCreate', async inter => {
			if (!inter.isSelectMenu()) return;

			if (!inter.user.id === interaction.user.id) {
				await inter.reply({ content: 'Were sorry but this app is not being used by you, please create your own help app by using the /help command', ephemeral: true });
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
			else if (inter.values[0] === 'addrole') {
				await inter.update({ embeds: [addroleInfoEmbed], components: [row1] });
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
		});

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};