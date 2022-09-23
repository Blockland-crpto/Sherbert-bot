const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor, embedAuthor, herbbotVersion } = require('../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Get info about another user')
		.addUserOption(opt =>
			opt.setName('User')
			.setDescription('in this option, select the user you want info about')
			.setRequired(true)),
	async execute(interaction) {
		const targetUser = interaction.options.getUser('User');
		const userInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('User information')
			.setAuthor({ name: embedAuthor })
			.setDescription(`Information about ${targetUser}`)
			.addFields(
				{ name: `${targetUser}'s tag'`, value: `${targetUser.tag}`, inline: true },
				{ name: `${targetUser}'s ID`, value: `${targetUser.id}`, inline: true },
			)
			.setTimestamp()
			.setFooter({ text: `Sherbertbot version ${herbbotVersion}` });
		
		await interaction.reply({ embeds: [userInfoEmbed], ephemeral: true });
	}
}