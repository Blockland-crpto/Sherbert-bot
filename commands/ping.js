const { SlashCommandBuilder } = require('discord.js');
const { client } = require('../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Returns the ping of the bot in milliseconds'),
	async execute(interaction) {
		await interaction.reply(`HerbBots current ping is ${client.ws.ping} ms`);
	}
}