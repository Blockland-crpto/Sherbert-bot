const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('this command is were you can get info on sherbertbots commands'),
	async execute(interaction, client) {
		const embedColor = '#7F8C8D';
		const SherbertBotVersion = '1.0.0';
		const embedAuthor = 'SherbertBot';

		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('helpselect')
					.setPlaceholder('Please select a command to view')
					.addOptions(
						{
							label: 'command list',
							description: 'Get a list of SherbertBots commands',
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
							label: '/serverinfo',
							description: 'Get information on the serverinfo command',
							value: 'serverinfo',
						},
						{
							label: '/userinfo',
							description: 'Get information on the userinfo command',
							value: 'userinfo',
						},
					),
			);

		// defines the command list embeded message
		const commandListEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('Command list')
			.setAuthor({ name: embedAuthor })
			.setDescription('Heres a list of SherbertBots commands')
			.addFields(
				{ name: '1. /ping', value: 'gives you the ping of SherbertBot (developer command)' },
				{ name: '2. /serverinfo', value: 'gives you information about the server' },
				{ name: '3. /userinfo', value: 'gives you information about a user' },
				{ name: '4. /help', value: 'this command' },
				{ name: '5. /ban', value: 'bans a user from the server' },
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
				{ name: 'Arguments', value: 'none' },
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
				{ name: 'Usage', value: 'type /help in the option "command" type choose the command you want info about' },
				{ name: 'Arguments', value: 'one optional argument - Command, in this argument select a command that you want help with' },
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
				{ name: 'Usage', value: 'type /serverinfo' },
				{ name: 'Arguments', value: 'no arguments' },
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
				{ name: 'Usage', value: 'type /userinfo and in the "user" option, type the user you want info about' },
				{ name: 'Arguments', value: 'one argument' },
				{ name: 'Info', value: 'userinfo is a command thats built into SherbertBot for helping users find information about other users' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();

		// defines userinfos embeded message
		const banInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('ban command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the ban command')
			.addFields(
				{ name: 'Usage', value: 'type /ban and in the "user" option, type the user you want to ban from the server' },
				{ name: ':rotating_light: Warning :rotating_light:', value: 'this action will prevent the user from coming back into the server unless you unban them!' },
				{ name: 'Arguments', value: 'one argument' },
				{ name: 'Info', value: 'ban is a command thats built into SherbertBot for helping admins maintain order in there servers through discord banning system, once a user has been banned, they cannot join back into the server unless the ban is removed, which can be done by using the /unban command, you CAN NOT ban SherbertBot or anyone with administrator privileges' },
				{ name: 'Added in', value: 'SherbertBot V1.0.0' },
			)
			.setTimestamp();


		await interaction.reply({ embeds: [commandListEmbed], components: [row] });

		client.on('interactionCreate', async inter => {
			if (!inter.isSelectMenu()) return;

			console.log(inter.values);

			if (inter.values[0] === 'ban') {
				await inter.update({ embeds: [banInfoEmbed], components: [row] });
			}
		});

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};