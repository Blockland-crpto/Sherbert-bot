const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Get info about the server your in'),
	async execute(interaction, client) {
		const online = onlineUsers(interaction);
		const serverInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('server information')
			.setAuthor({ name: 'SherbertBot' })
			.setDescription('Here is some information about the server your in')
			.addFields(
				{ name: 'Server name:', value: `${interaction.guild.name}` },
				{ name: 'Server ID:', value: `${interaction.guild.id}`, inline: true },
				{ name: 'Server total members', value: `${interaction.guild.memberCount}`, inline: true },
				{ name: 'Server online members', value: `${online}` }
			)
			.setTimestamp()
			.setFooter({ text: 'SherbertBot version v1.0.0' });

		async function onlineUsers(minteraction) {
			minteraction.guild.fetch({ withPresence: true }).then(fetchedMembers => {
				const onlineMembers = fetchedMembers.filter(member => member.presence?.status === 'online');
				return onlineMembers;
			})
		}
		
		await interaction.reply({ embeds: [serverInfoEmbed], ephemeral: true });

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};