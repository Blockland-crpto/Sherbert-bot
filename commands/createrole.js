const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ComponentType, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField, SelectMenuBuilder } = require('discord.js');
const { embedColor, embedAuthorName } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createrole')
		.setDescription('This app creates a user role ')
		.addStringOption(opt =>
			opt.setName('name')
				.setDescription('The name of the role you want to create')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
	async execute(interaction, client) {
		const permValue = [];
		const eName = interaction.options.getString('name');
		const roleCreateEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('role creation')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`Welcome to SherbertBots Role Creation App! in order to create the role ${eName}, please select the permissions that the ${eName} role should have`);
		const endedEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('ended')
			.setAuthor({ name: embedAuthorName })
			.setDescription('The app was cancelled, the role was not created');
		const roleCompletedEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('finished')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`the role ${eName} has been added to ${interaction.guild.name}!`);
		const permsSelectRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('perms')
					.setPlaceholder('No permissions selected')
					.setMinValues(1)
					.setMaxValues(9)
					.addOptions([
						{
							label: 'add reactions to messages',
							description: 'Allows the user to add reactions to messages',
							value: 'artm',
						},
						{
							label: 'administrator permissions',
							description: 'Allows the user who has this role to have all the permissions',
							value: 'admin',
						},
						{
							label: 'attach files',
							description: 'Allows the user who has this role to attach files to messages',
							value: 'af',
						},
						{
							label: 'banning permissions',
							description: 'Allows the user who has this role to ban/unban users from your server',
							value: 'bp',
						},
						{
							label: 'change nicknames',
							description: 'Allows the user who has this role to change the nicknames of users below there role',
							value: 'cn',
						},
						{
							label: 'connect to voice channels',
							description: 'Allows the user who has this role to join voice channels (does not apply to private ones)',
							value: 'ctvc',
						},
						{
							label: 'kicking permissions',
							description: 'Allows the user who has this role to kick users from your server',
							value: 'kp',
						},
						{
							label: 'manage roles permissions',
							description: 'Allows the user who has this role to manage roles that are below them in rank',
							value: 'mrp',
						},
						{
							label: 'manage channel permissions',
							description: 'Allows the user who has this role to manage channels',
							value: 'mcp',
						},
					]),
			);

		const completeButtonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('cancel')
					.setLabel('Quit')
					.setStyle(ButtonStyle.Danger),
			);


		const message = await interaction.reply({ embeds: [roleCreateEmbed], components: [permsSelectRow, completeButtonRow], ephemeral: true });
		const collector = message.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 15000 });
		collector.on('collect', async i => {
			i.values.forEach(string => {
				if (string === 'artm') {
					permValue.push(PermissionsBitField.Flags.AddReactions);
				}
				else if (string === 'admin') {
					permValue.push(PermissionsBitField.Flags.Administrator);
				}
				else if (string === 'af') {
					permValue.push(PermissionsBitField.Flags.AttachFiles);
				}
				else if (string === 'bp') {
					permValue.push(PermissionsBitField.Flags.BanMembers);
				}
				else if (string === 'cn') {
					permValue.push(PermissionsBitField.Flags.ChangeNickname);
				}
				else if (string === 'ctvc') {
					permValue.push(PermissionsBitField.Flags.Connect);
				}
				else if (string === 'kp') {
					permValue.push(PermissionsBitField.Flags.KickMembers);
				}
				else if (string === 'mrp') {
					permValue.push(PermissionsBitField.Flags.ManageRoles);
				}
				else if (string === 'mcp') {
					permValue.push(PermissionsBitField.Flags.ManageChannels);
				}
			});

			interaction.guild.roles.create({ name: eName, permissions: permValue });
			await i.update({ embeds: [roleCompletedEmbed], components: [], ephemeral: true });
			return 0;
		});
		const buttonCollector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
		buttonCollector.on('collect', async i => {
			if (i.customId === 'cancel') {
				await i.update({ embeds: [endedEmbed], components: [], ephemeral: true });
				return 0;
			}
		});

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};