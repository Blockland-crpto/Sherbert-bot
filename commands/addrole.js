const { SlashCommandBuilder, EmbedBuilder, ComponentType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { embedColor, embedAuthorName } = require('../config.json');

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
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.setDMPermission(false),
	async execute(interaction, client) {
		const targetMember = interaction.options.getMember('user');
		const targetUser = interaction.options.getUser('user');
		const targetRoles = interaction.options.getRole('role');
		const reason = interaction.options.getString('reason');
		const invokerM = interaction.member;
		const adminGiveConfirmEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('confirmation')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`The role ${targetRoles} is a administrator role, this means, that giving this role to ${targetUser} will give them owner permissions, they also can see any private channel`)
			.addFields(
				{ name: '\u200B', value: 'are you sure you want to do this?' },
			);
		const banGiveConfirmEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('confirmation')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`The role ${targetRoles} has ban permissions, this means, that giving this role to ${targetUser} will give them the ability to ban others from your server! and as a reminder, when you ban, a user cannot return to your server unless the ban is removed!`)
			.addFields(
				{ name: '\u200B', value: 'are you sure you want to do this?' },
			);
		const successGiveEmbedN = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('success')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`Successfully gave ${targetUser} the ${targetRoles} role`)
			.setTimestamp();
		const successGiveEmbedR = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('success')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`Successfully gave ${targetUser} the ${targetRoles} role because ${reason}`)
			.setTimestamp();
		const cancelledGiveEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('cancelled')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`${targetUser} did not get the ${targetRoles} role as the app was cancelled`)
			.setTimestamp();
		const confirmRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('confirm')
					.setLabel('Yes')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('decline')
					.setLabel('No')
					.setStyle(ButtonStyle.Danger),
			);

		try {
			init(interaction);
		}
		catch (error) {
			//todo: throw a error
		}
		
		
		if (targetRoles.permissions.has(PermissionFlagsBits.Administrator)) {
			if (!invokerM.permissions.has(PermissionFlagsBits.Administrator)) {
				await interaction.reply({ content: 'Were sorry, but you do not have the permissions to give this role to anyone', ephemeral: true });
				return 1;
			}
			const message = await interaction.reply({ embeds: [adminGiveConfirmEmbed], components: [confirmRow], ephemeral: true });
			const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
			collector.on('collect', async i => {
				if (i.customId === 'confirm') {
					if (reason !== null) {
						targetMember.roles.add(targetRoles, reason);
						await i.update({ embeds: [successGiveEmbedR], components: [], ephemeral: true });
					}
					else if (reason === null) {
						targetMember.roles.add(targetRoles);
						await i.update({ embeds: [successGiveEmbedN], components: [], ephemeral: true });
					}
				}
				else if (i.customId === 'decline') {
					await i.update({ embeds: [cancelledGiveEmbed], components: [], ephemeral: true });
				}
			});

			collector.on('end', collected => {
				if (collected === null) {
					interaction.followUp('Were sorry, but you did not respond in time, we did not give the role');
					return 1;
				}
				return;
			});
		}

		else if (targetRoles.permissions.has(PermissionFlagsBits.BanMembers)) {
			if (!invokerM.permissions.has(PermissionFlagsBits.BanMembers)) {
				await interaction.reply({ content: 'Were sorry, but you do not have the permissions to give this role to anyone', ephemeral: true });
				return 1;
			}
			const message = await interaction.reply({ embeds: [banGiveConfirmEmbed], components: [confirmRow], ephemeral: true });
			const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
			collector.on('collect', async i => {
				if (i.customId === 'confirm') {
					if (reason !== null) {
						targetMember.roles.add(targetRoles, reason);
						await i.update({ embeds: [successGiveEmbedR], components: [], ephemeral: true });
					}
					else if (reason === null) {
						targetMember.roles.add(targetRoles);
						await i.update({ embeds: [successGiveEmbedN], components: [], ephemeral: true });
					}
				}
				else if (i.customId === 'decline') {
					await i.update({ embeds: [cancelledGiveEmbed], components: [], ephemeral: true });
				}
			});

			collector.on('end', collected => {
				if (collected === null) {
					interaction.followUp('Were sorry, but you did not respond to this message, we did not give the role');
					return 1;
				}
				return;
			});
		}
		else {
			targetUser.send(`Hello ${targetUser}! we just wanted to let you know that you have received a new role in ${interaction.guild.name}!`);
			if (reason != null) {
				targetMember.roles.add(targetRoles, reason);
				await interaction.reply({ embeds: [successGiveEmbedR], components: [], ephemeral: true });
			}
			else if (reason === null) {
				targetMember.roles.add(targetRoles);
				await interaction.reply({ embeds: [successGiveEmbedN], components: [], ephemeral: true });
			}
			return 0;
		}

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});

		return 0;

		async function init(interaction) {
			const questionMarkErrorEmbed = new EmbedBuilder()
				.setColor(embedColor)
				.setTitle('error')
				.setAuthor({ name: embedAuthorName })
				.setDescription('Were sorry, but you cannot put question marks in the reason option, please try again')
				.setTimestamp();

			const alreadyHasRoleErrorEmbed = new EmbedBuilder()
				.setColor(embedColor)
				.setTitle('error')
				.setAuthor({ name: embedAuthorName })
				.setDescription(`Were sorry, but you cannot give ${targetUser} the ${targetRoles} role, they already have this role`);

			const lowPermsBotErrorEmbed = new EmbedBuilder()
				.setColor(embedColor)
				.setTitle('error')
				.setAuthor({ name: embedAuthorName })
				.setDescription(`Were sorry, but we cannot give ${targetUser} the ${targetRoles} role, this needs permissions that SherbertBot does not have`);

			const questionMarkError = new Error('User inputed question mark in reason option')

			async function initCheck() {
				// checked
				if (reason && reason.includes('?')) {
					await interaction.reply({ embeds: [questionMarkErrorEmbed], ephemeral: true });
					
				}
				else if (targetMember.roles.cache.some(role => role.name === targetRoles.name)) {
					await interaction.reply({ embeds: [alreadyHasRoleErrorEmbed], ephemeral: true });
					return 1;
				}
				else if (!targetRoles.editable) {
					await interaction.reply({ embeds: [lowPermsBotErrorEmbed], ephemeral: true });
					return 1;
				}
				else {
					return 0;
				}
			}

			initCheck();
		}

	},
};