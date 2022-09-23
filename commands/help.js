const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('this command is were you can get info on sherbertbots commands')
		.addStringOption(opt =>
			opt.setName('command')
				.setDescription('if you want more info on a specific command, type the command here')
				.setRequired(false)
				.addChoices(
					{ name: 'command list', value: 'cmdlist' },
					{ name: '/ping', value: 'ping' },
					{ name: '/help', value: 'help' },
					{ name: '/serverinfo', value: 'serverinfo' },
					{ name: '/userinfo', value: 'userinfo' },
				)),
	async execute(interaction) {
		const selectedCommand = interaction.options.getString('command');
		const embedColor = '#7F8C8D';
		const SherbertBotVersion = '1.0.0';
		const embedAuthor = 'SherbertBot';

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


		switch (selectedCommand) {
		case 'ping':
			await interaction.reply({ embeds: [pingInfoEmbed] });
			break;
		case 'help':
			await interaction.reply({ embeds: [helpInfoEmbed] });
			break;
		case 'serverinfo':
			await interaction.reply({ embeds: [serverinfInfoEmbed] });
			break;
		case 'userinfo':
			await interaction.reply({ embeds: [userinfInfoEmbed] });
			break;
		default:
			await interaction.reply({ embeds: [commandListEmbed] });
			break;
		}
	},
};