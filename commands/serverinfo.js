const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Get info about the server your in'),
	async execute(interaction) {
		const serverInfoEmbed = new EmbedBuilder()
			.setColor(0x0099F)
			.setTitle('server information')
			.setAuthor({ name: 'SherbertBot' })
			.setDescription('Here is some information about the server your in')
			.addFields(
				{ name: 'Server name:', value: `${interaction.guild.name}` },
				{ name: 'Server ID:', value: `${interaction.guild.id}`, inline: true },
				{ name: 'Server total members', value: `${interaction.guild.memberCount}`, inline: true },
			)
			.setTimestamp()
			.setFooter({ text: 'SherbertBot version v1.0.0' });
		await interaction.reply({ embeds: [serverInfoEmbed], ephemeral: true });
	},
};