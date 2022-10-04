const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../config.json');

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
		const targetMember = interaction.options.getMember('user');
		const userInfoEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('user information')
			.setAuthor({ name: 'SherbertBot' })
			.setDescription(`Information about ${targetUser}`)
			.addFields(
				{ name: `${targetUser.username}'s tag`, value: `${targetUser.tag}` },
				{ name: `${targetUser.username}'s ID`, value: `${targetUser.id}` },
				{ name: `${targetUser.username}'s joined at:`, value: `${targetUser.createdAt}` },
				{ name: 'Bot?', value: `${targetUser.bot}` },
				{ name: `${targetUser.username}'s highest role`, value: `${targetMember.roles.highest}` },
			)
			.setTimestamp()
			.setFooter({ text: 'SherbertBot version v1.0.0' });
		await interaction.reply({ embeds: [userInfoEmbed], ephemeral: true });

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};