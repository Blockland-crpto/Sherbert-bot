const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const keyv = require('keyv');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('This command bans a user from the server')
		.addUserOption(opt =>
			opt.setName('user')
				.setDescription('the user you want to ban')
				.setRequired(true))
		.addStringOption(opt =>
			opt.setName('reason')
				.setDescription('why you are banning the user')
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction, client) {
		const user = interaction.options.getUser('user');
		const userm = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');
		if (!interaction.guild.available) {
			return 1;
		}
		else if (!userm.manageable) {
			await interaction.reply({ content: `Were sorry, but you cannot ban ${user}, they have more permissions then SherbertBot, please try again`, ephemeral: true });
			return 1;
		}
		else if (interaction.user.id === user.id) {
			await interaction.reply({ content: 'Were sorry, but you cannot ban yourself, please try again', ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (client.user.id === user.id) {
			await interaction.reply({ content: 'Were sorry, but you cannot ban SherbertBot, please try again', ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (userm === null) {
			await interaction.reply({ content: 'Were sorry, but you cannot ban a user thats not part of this guild, please try again', ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (!userm.bannable) {
			await interaction.reply({ content: `Were sorry, but you cannot ban ${user}, they are not bannable by SherbertBot, please try again`, ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (!reason) {
			interaction.guild.members.ban(user);
			await interaction.reply({ content: `${user} has been successfully banned from ${interaction.guild.name}`, ephemeral: true })
				.catch(console.error);
		}
		else {
			interaction.guild.members.ban(user, { reason: reason });
			await interaction.reply({ content: `${user} has been successfully banned from ${interaction.guild.name} because ${reason}`, ephemeral: true })
				.catch(console.error);
		}

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};