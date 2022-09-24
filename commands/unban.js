const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a user from the server')
		.addUserOption(opt =>
			opt.setName('user')
				.setDescription('the user you want to unban')
				.setRequired(true)),
	async execute(interaction, client) {
		const user = interaction.options.getUser('user');
		try {
			await interaction.guild.bans.fetch(user);
		}
		catch (error) {

			if (error.code === 10026) {
				await interaction.reply({ content: 'Were sorry, but you cannot unban a user that isnt banned, please try again', ephemeral: true });
				return 1;
			}
			else {
				await interaction.reply({ content: 'Were sorry, but a unknown error occured while trying to unban the user, please try again', ephemeral: true });
				return 1;
			}
		}
		if (interaction.user.id === user.id) {
			await interaction.reply({ content: 'Were sorry, but you cannot unban yourself, please try again', ephemeral: true });
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