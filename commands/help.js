const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor, embedAuthor } = require('../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Help')
		.setDescription('This command is were you can get info on Herbbots commands, to get info on how to use a command, use the command option, to get a list of usable commands, just use help with no options or select the command list option')
		.addStringOption(opt =>
			opt.setName('Command')
				.setDescription('If you want more info on a specific command, type the command here')
				.setRequired(false)
				.addChoices(
					{ name: '/ping', value: 'ping' },
					{ name: '/help', value: 'help' },
					{ name: 'Command list', value: 'cmdlist' },
				)),
	async execute(interaction) {
		const selectedCommand = interaction.options.getString('Command');

		//defines the command list embeded message
		const commandListEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('Command list')
			.setAuthor({ name: embedAuthor })
			.setDescription('Heres a list of Herbbots commands')
			.addFields(
				{ name: '1. ping', value: 'gives you the ping of Herbbot' },
				{ name: '2. Server info', value: 'gives you information about the server' },
				{ name: '3. Help', value: 'this command' }
			)
			.setTimestamp()
			.setFooter({ text: 'Herbbot version 1.0.0' });

		//defines pings embeded message
		const pingInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('Ping command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the ping command')
			.addField(
				{ name: 'Usage', value: 'type /ping' },
				{ name: 'Arguments', value: 'none' },
				{ name: 'Info', value: `Note: if you aren't a developer or don't know technology very well, this command isn't for you, if you got here by accident, just ignore this message and carry on with you day. Ping is a command thats built into Herbbot for the sake of performance measurement. The command measures how long it takes for Herbbot to communicate with discord` },
				{ name: 'Added in', value: 'Herbbot V1.0.0' },
			)
			.setTimestamp();

		//defines helps embeded message
		const helpInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('help command')
			.setAuthor({ name: embedAuthor })
			.setDescription('Info on the help command')
			.addField(
				{ name: 'Usage', value: 'type /help' },
				{ name: 'Arguments', value: 'one optional argument - Command, in this argument select a command that you want help with' },
				{ name: 'Info', value: `Help is a command thats built into Herbbot for helping users. The command can send info about a command if you use the "command" argument or give you a command list if no command is selected` },
				{ name: 'Added in', value: 'Herbbot V1.0.0' },
			)
			.setTimestamp();

		if(selectedCommand === null || selectedCommand === undefined || selectedCommand === 'cmdlist') {
			await interaction.reply({ embeds: [commandListEmbed] });
		} else if(selectedCommand === 'ping') {
			await interaction.reply({ embeds: [pingInfoEmbed] });
		} else if(selectedCommand === 'help') {
			await interaction.reply({ embeds: [helpInfoEmbed] });
		} else {
			await interaction.reply({ content: 'Were sorry, but a error occured with the help command, please try again later', ephemeral: true });
		}
	}
}