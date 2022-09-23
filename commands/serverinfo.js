const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor, embedAuthor, herbbotVersion } = require('../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Get info about the server your in'),
	async execute(interaction) {
		let onlineMembers;
		const serverInfoEmbed = new EmbedBuilder()
			.setColor(embedColor);
			.setTitle('Server information')
			.setAuthor({ name: embedAuthor })
			.setDescription('Here is some information about the server your in')
			.addFields(
				{ name: 'Server name:', value: `${interaction.guild.name}` },
				{ name: 'Server ID:', value: `${interaction.guild.id}`, inline: true },
				{ name: 'Server total members', value: `${interaction.guild.memberCount}`, inline: true },
				{ name: 'Server total online members', value: `${onlineMembers}`, inline: true},
			)
			.setTimestamp()
			.setFooter({ text: `Herbbot version ${herbbotVersion}` })

		await interaction.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
			const usersOnline = fetchedMembers.filter(member => member.presence?.status === online);
			onlineMembers = usersOnline.size;
		})
		
		await interaction.reply({ embeds: [serverInfoEmbed], ephemeral: true });
	}
}