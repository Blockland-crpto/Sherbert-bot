const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, quote, PermissionsBitField } = require('discord.js');
const { embedColor } = require('../config.json');

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
		const name = interaction.options.getString('name');
		const invoker = interaction.member;
		const eName = quote(name);
		const roleCreateEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('Role creation')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`Welcome to SherbertBots Role Creation App! in order to create the role, please select the permissions that the ${eName} role should have`);
		const nullPermEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('error')
			.setAuthor({ name: embedAuthorName })
			.setDescription('Were sorry, but you cannot make a role without selecting permissions');
		const endedEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('ended')
			.setAuthor({ name: embedAuthorName })
			.setDescription('The app was cancelled, the role was not created');
		const roleCompletedEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('finished')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`the role ${eName} has been added to ${interaction.server.name}!`);
		const permsSelectRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('perms')
					.setPlaceHolder('No permissions selected')
					.setMinValue(1)
					.setMaxValue(23)
					.addOptions([
						{
							label: 'Add Reactions To Messages',
							description: 'Allows the user to add reactions to messages',
							value: PermissionsBitField.Flags.AddReactions,
						},
						{
							label: 'Administrator Permissions',
							description: 'Allows the user who has this role to have all the permissions, WARNING: THIS COMMAND WILL GIVE THE USER PERMISSIONS EQUAL TO THE OWNER',
							value: PermissionsBitField.Flags.Administrator,
						},
						{
							label: 'Attach Files',
							description: 'Allows the user who has this role to attach files to messages',
							value: PermissionsBitField.Flags.AttachFiles,
						},
						{
							label: 'Banning Permissions',
							description: 'Allows the user who has this role to ban users from your server, this also allows them to remove bans',
							value: PermissionsBitField.Flags.BanMembers,
						},
						{
							label: 'Change Nicknames',
							description: 'Allows the user who has this role to change the nicknames of users below there role',
							value: PermissionsBitField.Flags.ChangeNickname,
						},
						{
							label: 'Connect To Voice Channels',
							description: 'Allows the user who has this role to join voice channels (does not apply to private ones)',
							value: PermissionsBitField.Flags.Connect, 
						},
						{
							label: 'Kicking Permissions',
							description: 'Allows the user who has this role to kick users from your server',
							value: PermissionsBitField.Flags.KickMembers,
						},	
						{
							label: 'Manage Roles Permissions',
							description: 'Allows the user who has this role to manage roles that are below them in rank',
							value: PermissionsBitField.Flags.ManageRoles,
						},
						{
							label: 'Manage Channel Permissions',
							description: 'Allows the user who has this role to manage channels',
							value: PermissionsBitField.Flags.ManageChannels,
						},
					]),
			);

		const completeButtonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('complete')
					.setLabel('Done')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('cancel')
					.setLabel('Quit')
					.setStyle(ButtonStyle.Danger),
			);

		const okButtonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('dismiss')
					.setLabel('Ok')
					.setStyle(ButtonStyle.Success),
			);

		await interaction.reply({ embeds: [roleCreateEmbed], components: [permsSelectRow, completeButtonRow], ephemeral: true });

		client.on('interactionCreate', async i => {
			if (!i.isSelectMenu()) return;
			permValue.push(i.values);
		})
		
		client.on('interactionCreate', async inter => {
			if (!inter.isButton()) return;
			if (inter.customId === 'complete') {
				if (permValue === null) {
					await inter.update({ embeds: [nullPermEmbed], components: [okButtonRow], ephemeral: true });
					return 1;
				}
				else {
					interaction.guild.roles.create({ name: name, permissions: permValue });
					await inter.update({ embeds: [roleCompletedEmbed], components: [], ephemeral: true });
					return 0;
				}
			}
			else if (inter.customId === 'cancel') {
				await i.update({ embeds: [endedEmbed], components: [], ephemeral: true });
				return 0;
			}
			else if (inter.customId === 'dismiss') {
				await i.update({ embeds: [roleCreateEmbed], components: [permsSelectRow, completeButtonRow], ephemeral: true });
				return 0;
			}
		});
		
		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};