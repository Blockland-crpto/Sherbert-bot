const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor, embedAuthor } = require('../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Get info about the server your in'),
	async execute(interaction) {
		const serverInfoEmbed = new EmbedBuilder()
			.setColor(embedColor);
			.setTitle('Server information')
			.setAuthor({ name: embedAuthor })
			.setDescription('')
	}
}