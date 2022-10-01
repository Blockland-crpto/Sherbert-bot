const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a user from the server')
		.addStringOption(opt =>
			opt.setName('userid')
				.setDescription('the id of the user you want to unban')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction, client) {
		const id = interaction.options.getString('userid');
		const user = client.users.fetch(id);
		const notBannedErrorEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setName('error')
			.setAuthor({ name: 'SherbertBot' })
			.setDescription('Were sorry, but you cannot unban someone who is not banned, please try again')
			.setTimestamp()
			.setFooter({ text: 'SherbertBot V1.0.0' });
		const unknownErrorEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setName('error')
			.setAuthor({ name: 'SherbertBot' })
			.setDescription('Were sorry, but a unknown error occured while trying to unban the user, please try again')
			.setTimestamp()
			.setFooter({ text: 'SherbertBot V1.0.0' });
		const userAttemptedSelfEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setName('error')
			.setAuthor({ name: 'SherbertBot' })
			.setDescription('Were sorry, but you cannot unban yourself, as if your in this server, you are not banned, please try again')
			.setTimestamp()
			.setFooter({ text: 'SherbertBot V1.0.0' });

		try {
			await interaction.guild.bans.fetch()
				.then(console.log);
		}
		catch (error) {
			if (error.code === 10026) {
				await interaction.reply({ embeds: [notBannedErrorEmbed], ephemeral: true });
				return 1;
			}
			else {
				await interaction.reply({ embeds: [unknownErrorEmbed], ephemeral: true });
				return 1;
			}
		}
		if (interaction.user.id === user.id) {
			await interaction.reply({ embeds: [userAttemptedSelfEmbed], ephemeral: true });
			return 1;
		}
		else if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
			await interaction.reply({ content: 'Were sorry, but you cannot use the unban command, you do not have the permissions, please try again', ephemeral: true });
			return 1;
		}
		else if (client.user.id === user.id) {
			await interaction.reply({ content: 'Were sorry, but you cannot unban SherbertBot, as SherbertBot cannot be banned, please try again', ephemeral: true });
			return 1;
		}
		else {
			interaction.guild.members.unban(user);
			await interaction.reply({ content: `${user} has been successfully unbanned from ${interaction.guild.name}`, ephemeral: true });
		}

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};