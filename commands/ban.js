const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { embedColor, embedAuthorName } = require('../config.json');

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
		const targetUser = interaction.options.getUser('user');
		const targetMember = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');
		const guildOwnerId = interaction.guild.ownerId;
		const banSelfErrorEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('error')
			.setAuthor({ name: embedAuthorName })
			.setDescription('Were sorry, but you cannot ban yourself, please try again');

		if (!interaction.guild.available) {
			return 1;
		}
		else if (interaction.user.id === targetUser.id) {
			await interaction.reply({ embeds: [banSelfErrorEmbed], ephemeral: true });
		}
		else if (targetUser.id === guildOwnerId) {
			await interaction.reply({ content: `Were sorry, but you cannot ban ${targetUser}, they are the owner of ${interaction.guild.name}`, ephemeral: true });
		}
		else if (client.user.id === targetUser.id) {
			await interaction.reply({ content: 'Were sorry, but you cannot ban SherbertBot, please try again', ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (!targetMember.manageable) {
			await interaction.reply({ content: `Were sorry, but you cannot ban ${targetUser}, they are not managable by SherbertBot`, ephemeral: true });
			return 1;
		}
		else if (targetMember === null) {
			await interaction.reply({ content: 'Were sorry, but you cannot ban a user thats not part of this guild, please try again', ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (!targetUser.bannable) {
			await interaction.reply({ content: `Were sorry, but you cannot ban ${targetUser}, they are not bannable by SherbertBot, please try again`, ephemeral: true })
				.catch(console.error);
			return 1;
		}
		else if (!reason) {
			interaction.guild.members.ban(targetUser);
			await interaction.reply({ content: `${targetUser} has been successfully banned from ${interaction.guild.name}`, ephemeral: true })
				.catch(console.error);
		}
		else {
			interaction.guild.members.ban(targetUser, { reason: reason });
			await interaction.reply({ content: `${targetUser} has been successfully banned from ${interaction.guild.name} because ${reason}`, ephemeral: true })
				.catch(console.error);
		}

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};