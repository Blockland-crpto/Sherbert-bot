const { SlashCommandBuilder, EmbedBuilder, PermissionsFlagBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { embedColor } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('gives roles to another user')
		.addUserOption(opt =>
			opt.setName('user')
				.setDescription('in this option, select the user you want to give roles to')
				.setRequired(true))
		.addRoleOption(opt =>
			opt.setName('role')
				.setDescription('in this option, select the role you want to give to the member')
				.setRequired(true))
		.addStringOption(opt =>
			opt.setName('reason')
				.setDescription('in this option, you can tell us why your giving this role')
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionsFlagBits.ManageRoles),
	async execute(interaction, client) {
		const targetMember = interaction.options.getMember('user');
		const targetUser = interaction.options.getUser('user');
		const targetRoles = interaction.options.getRole('role');
		const adminGiveConfirmEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('confirmation')
			.setAuthor({ name: 'SherbertBot' })
			.setDescription(`The role ${targetRole} is a administrator role, this means, that giving this role to ${targetUser} will give them owner permissions, they also can see any private channel`)
			.addField(
				{ name: '\u200B', value: 'are you sure you want to do this?' },
			);
		const successGiveEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('gave role')
			.setAuthor({ name: 'SherbertBot' })
			.setDescription(`Successfully gave ${targetUser} the ${targetRole} role`)
		const confirmRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('confirm')
					.setLabel('Yes')
					.setStyle(ButtonStyle.Success)
				new ButtonBuilder()
					.setCustomId('decline')
					.setLabel('No')
					.setStyle(ButtonStyle.Danger)
			);
		const successRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('undo')
					.setLabel('Undo')
					.setStyle(ButtonStyle.Danger)
				new ButtonBuilder()
					.setCustomId('close')
					.setLabel('Close')
					.setStyle(ButtonStyle.Success)
			)
		
		if (targetMember.roles.cache.some(role => role.name === targetRole.name)) {
			await interaction.reply({ content: `Were sorry, but you cannot give ${targetUser} the ${targetRoles} role, they already have this role`, ephemeral: true });
			return 1;
		}

		if (targetRoles.permissions.has(PermissionsFlagBits.Administrator)) {
			await interaction.reply({ embeds: [adminGiveConfirmEmbed], components: [confirmRow], ephemeral: true });
			let collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
			collector.on('collect', async i => {
				if (i.customId === 'confirm') {
					collector = null;
					targetMember.roles.add(targetRoles);
					await i.update({ embeds: [successGiveEmbed], components: [successRow], ephemeral: true });
					collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
					collector.on('collect', async i => {
						if (i.customId === 'undo') {
							targetMember.roles.remove(targetRoles);
							interaction.followUp({ content: 'The role was removed', ephemeral: true });
							collector = null;
						}
						else if (i.customId === 'close') {
							interaction.deleteReply();
							collector = null;
						}
					});
				
				}
				else if (i.customId === 'decline') {
					collector = null;
					await interaction.deleteReply();
				}
				return 0;
			});
			
			client.on('interactionCreate', async inter => {
				console.log(`${inter} has occured, closing buttons`);
				collector = null;
				return 0;
			});
			
		}

		targetMember.roles.add(targetRoles)
		
		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};