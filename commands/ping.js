const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setNameLocalizations()
		.setDescription('Returns the ping of the bot in milliseconds'),
	async execute(interaction, client) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms\nWebsocket heartbeat is: ${client.ws.ping}ms`);

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};