const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('get info about another user')
		.addUserOption(opt =>
			opt.setName('user')
				.setDescription('in this option, select the user you want info about')
				.setRequired(true)),
	async execute(interaction, client) {
		const targetUser = interaction.options.getUser('user');
		const userInfoEmbed = new EmbedBuilder()
			.setColor(0x0099F)
			.setTitle('user information')
			.setAuthor({ name: 'SherbertBot' })
			.setDescription(`Information about ${targetUser}`)
			.addFields(
				{ name: `${targetUser.username}'s tag`, value: `${targetUser.tag}`, inline: true },
				{ name: `${targetUser.username}'s ID`, value: `${targetUser.id}`, inline: true },
				{ name: `${targetUser.username}'s joined at:`, value: `${targetUser.createdAt}` },
				{ name: 'Bot?', value: `${targetUser.bot}` },
			)
			.setTimestamp()
			.setFooter({ text: 'SherbertBot version v1.0.0' });
		await interaction.reply({ embeds: [userInfoEmbed], ephemeral: true });

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};