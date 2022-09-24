const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a user from the server')
		.addUserOption(opt =>
			opt.setName('user')
				.setDescription('the user you want to kick')
				.setRequired(true))
		.addStringOption(opt =>
			opt.setName('reason')
				.setDescription('the why you want to kick')
				.setRequired(false)),
	async execute(interaction, client) {
		const user = interaction.options.getUser('user');
		const userm = interaction.options.getMember('user');

		if (interaction.user.id === user.id) {
			await interaction.reply({ content: 'Were sorry, but you cannot kick yourself, please try again', ephemeral: true });
			return 1;
		}
		else if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
			await interaction.reply({ content: 'Were sorry, but you cannot use the kick command, you do not have the permissions, please try again', ephemeral: true });
			return 1;
		}
		else if (client.user.id === user.id) {
			await interaction.reply({ content: 'Were sorry, but you cannot kick SherbertBot, please try again', ephemeral: true });
			return 1;
		}
		else if (userm === null) {
			await interaction.reply({ content: 'Were sorry, but you cannot ban a kick thats not part of this guild, please try again', ephemeral: true });
			return 1;
		}
		else if (!userm.manageable) {
			await interaction.reply({ content: `Were sorry, but you cannot kick ${user}, they have permissions that are greater then SherbertBot, please try again`, ephemeral: true });
			return 1;
		}
		else {

			userm.kick(interaction.options.getString('reason'));
			await interaction.reply({ content: `${user} has been successfully kick from ${interaction.guild.name}`, ephemeral: true });
		}

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};