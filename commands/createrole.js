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
			.setDescription(`Welcome to SherbertBots Role Creation App! in order to create the role ${eName}, you will have to select permissions the role should have, please select the permissions that the ${eName} role should have`);

		const roleCompletedEmbed2 = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('role creation')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`Great! now please select other permissions that the ${eName} role should have`);


		const endedEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('ended')
			.setAuthor({ name: embedAuthorName })
			.setDescription('The app was cancelled, the role was not created');

		const outOfTimeEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('ended')
			.setAuthor({ name: embedAuthorName })
			.setDescription('The app got no responce, the role was not created');


		const roleCompletedEmbed = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('finished')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`the role ${eName} has been added to ${interaction.guild.name}!`);

		const permSelectOption1 = [
			{
				label: 'add reactions to messages',
				description: 'Allows the role to add reactions to messages',
				value: 'addreactionstomessages',
				default: true,
			},
			{
				label: 'administrator permissions',
				description: 'Allows the role to have all the permissions',
				value: 'administrator',
			},
			{
				label: 'attach files',
				description: 'Allows the role to attach files to messages',
				value: 'attachfiles',
				default: true,
			},
			{
				label: 'banning permissions',
				description: 'Allows the role to ban/unban users from your server',
				value: 'banningpermissions',
			},
			{
				label: 'change their own nickname',
				description: 'Allows the role to change their own nickname',
				value: 'changetheirownnickname',
				default: true,
			},
			{
				label: 'connect to voice channels',
				description: 'Allows the role to join voice channels (does not apply to private ones)',
				value: 'connecttovoicechannels',
				default: true,
			},
			{
				label: 'create invites to the server',
				description: 'Allows the role to create invitations to your server',
				value: 'createinvitestotheserver',
				default: true,
			},
			{
				label: 'create private threads',
				description: 'Allows the role to create a private thread in your server',
				value: 'createprivatethreads',
			},
			{
				label: 'create public threads',
				description: 'Allows the role to create a public thread in your server',
				value: 'createpublicthreads',
				default: true,
			},
			{
				label: 'deafen members',
				description: 'Allows the role to deafen members below there rank',
				value: 'deafenmembers',
			},
			{
				label: 'embed links',
				description: 'Allows the role to send embeded links in chat',
				value: 'embedlinks',
			},
			{
				label: 'kick members',
				description: 'Allows the role to kick users from your server',
				value: 'kickmembers',
			},
			{
				label: 'manage channel',
				description: 'Allows the role to manage channels',
				value: 'managechannel',
			},
			{
				label: 'manage emojis and stickers',
				description: 'Allows the role to remove and create emojis/stickers in your server',
				value: 'manageemojisandstickers',
			},
			{
				label: 'manage events',
				description: 'Allows the role to manage events in your server',
				value: 'manageevents',
			},
			{
				label: 'manage messages',
				description: 'Allows the role to delete and edit messages sent by users lower then there rank',
				value: 'managemessages',
			},
			{
				label: 'manage nicknames',
				description: 'Allows the role to manage others nicknames below there rank',
				value: 'managenicknames',
			},
			{
				label: 'manage roles',
				description: 'Allows the role to manage roles that are below them in rank',
				value: 'manageroles',
			},
			{
				label: 'manage server',
				description: 'Allows the role to manage your server (i.e add bots, create channels, etc)',
				value: 'manageguild',
			},

		];

		const permSelectOption2 = [
			{
				label: 'manage threads',
				description: 'Allows the role to manage threads created by users below them in rank',
				value: 'managethreads',
			},
			{
				label: 'manage webhooks',
				description: 'Allows the role to manage webhooks created by users below them in rank',
				value: 'managewebhooks',
			},
			{
				label: 'mention everyone',
				description: 'Allows the role to mention everyone in the server',
				value: 'mentioneveryone',
			},
			{
				label: 'moderate members',
				description: 'Allows the role to moderate users below there rank',
				value: 'moderatemembers',
			},
			{
				label: 'move members',
				description: 'Allows the role to move members from one voice channel to another',
				value: 'movemembers',
			},
			{
				label: 'mute members',
				description: 'Allows the role to mute members who are below them in rank in voice channels',
				value: 'mutemembers',
			},
			{
				label: 'priority-speak',
				description: 'Allows the role to use the priority speaker feature',
				value: 'priorityspeaker',
			},
			{
				label: 'read message history',
				description: 'Allows the role to read past messages',
				value: 'readmessagehistory',
			},
			{
				label: 'request to speak',
				description: 'Allows the role to request to speak in stage voice channels',
				value: 'requesttospeak',
			},
			{
				label: 'send messages',
				description: 'Allows the role to send messages in any channel (except private channels)',
				value: 'sendmessages',
			},
			{
				label: 'send messages in threads',
				description: 'Allows the role to send messages in any thread (except private threads)',
				value: 'sendmessagesinthreads',
			},
			{
				label: 'send text-to-speech messages',
				description: 'Allows the role to send text to speech messages',
				value: 'sendttsmessages',
			},
			{
				label: 'speak in voice chats',
				description: 'Allows the role to speak in voice channels',
				value: 'speak',
				default: true,
			},
			{
				label: 'stream',
				description: 'Allows the role to live stream in voice channels',
				value: 'stream',
				default: true,
			},
			{
				label: 'use app commands',
				description: 'Allows the role to use app commands',
				value: 'useapplicationcommands',
			},
			{
				label: 'use embedded apps',
				description: 'Allows the role to use embedded apps',
				value: 'useembeddedactivities',
			},
			{
				label: 'use external emojis',
				description: 'Allows the role to use emojis from other servers',
				value: 'useexternalemojis',
				default: true,
			},
			{
				label: 'use external stickers',
				description: 'Allows the role to use stickers from other servers',
				value: 'useexternalstickers',
				default: true,
			},
			{
				label: 'use voice activity dectection',
				description: 'Allows the role to use voice activity detection in voice chats',
				value: 'usevad',
				default: true,
			},
			{
				label: 'view audit log',
				description: 'Allows the role to view the server audit log',
				value: 'viewauditlog',
			},
			{
				label: 'view channels',
				description: 'Allows the role to view any channels (except private channels)',
				value: 'viewchannel',
			},
			{
				label: 'view server insights',
				description: 'Allows the role to view your servers insights',
				value: 'viewguildinsights',
			},
		];

		const permsSelectRow1 = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('AtoMPerms')
					.setPlaceholder('No permissions selected')
					.setMinValues(1)
					.setMaxValues(permSelectOption1.length)
					.addOptions(permSelectOption1),
			);

		const permsSelectRow2 = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('MtoVPerms')
					.setPlaceholder('No permissions selected')
					.setMinValues(1)
					.setMaxValues(permSelectOption2.length)
					.addOptions(permSelectOption2),
			);

		const completeButtonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('cancel')
					.setLabel('Quit')
					.setStyle(ButtonStyle.Danger),
			);

		// eslint-disable-next-line no-undef
		const rolecomplete1 = new Promise(async (resolve, reject) => {
			const message = await interaction.reply({ embeds: [roleCreateEmbed], components: [permsSelectRow1, completeButtonRow] });
			const collector = message.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 15000 });
			const buttonCollector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
			collector.on('collect', async i => {
				i.values.forEach(string => {
					if (string === 'addreactionstomessages') {
						permValue.push(PermissionsBitField.Flags.AddReactions);
					}
					else if (string === 'administrator') {
						permValue.push(PermissionsBitField.Flags.Administrator);
					}
					else if (string === 'attachfiles') {
						permValue.push(PermissionsBitField.Flags.AttachFiles);
					}
					else if (string === 'banningpermissions') {
						permValue.push(PermissionsBitField.Flags.BanMembers);
					}
					else if (string === 'changetheirownnickname') {
						permValue.push(PermissionsBitField.Flags.ChangeNickname);
					}
					else if (string === 'connecttovoicechannels') {
						permValue.push(PermissionsBitField.Flags.Connect);
					}
					else if (string === 'createinvitestotheserver') {
						permValue.push(PermissionsBitField.Flags.CreateInstantInvite);
					}
					else if (string === 'createprivatethreads') {
						permValue.push(PermissionsBitField.Flags.CreatePrivateThreads);
					}
					else if (string === 'createpublicthreads') {
						permValue.push(PermissionsBitField.Flags.CreatePublicThreads);
					}
					else if (string === 'deafenmembers') {
						permValue.push(PermissionsBitField.Flags.DeafenMembers);
					}
					else if (string === 'embedlinks') {
						permValue.push(PermissionsBitField.Flags.EmbedLinks);
					}
					else if (string === 'kickmembers') {
						permValue.push(PermissionsBitField.Flags.KickMembers);
					}
					else if (string === 'managechannel') {
						permValue.push(PermissionsBitField.Flags.ManageChannels);
					}
					else if (string === 'manageemojisandstickers') {
						permValue.push(PermissionsBitField.Flags.ManageEmojisAndStickers);
					}
					else if (string === 'manageevents') {
						permValue.push(PermissionsBitField.Flags.ManageEvents);
					}
					else if (string === 'managemessages') {
						permValue.push(PermissionsBitField.Flags.ManageMessages);
					}
					else if (string === 'managenicknames') {
						permValue.push(PermissionsBitField.Flags.ManageNicknames);
					}
					else if (string === 'manageroles') {
						permValue.push(PermissionsBitField.Flags.ManageRoles);
					}
					else if (string === 'manageguild') {
						permValue.push(PermissionsBitField.Flags.ManageGuild);
					}
				});
				resolve(permValue);
			});

			collector.on('ignore', async () => {
				interaction.update({ embeds: [outOfTimeEmbed], components: [], ephemeral: true });
				reject();
			});

			buttonCollector.on('collect', async i => {
				if (i.customId === 'cancel') {
					await i.update({ embeds: [endedEmbed], components: [] });
					return 0;
				}
			});
		});

		// eslint-disable-next-line no-undef, no-async-promise-executor
		const rolecomplete2 = new Promise(async (resolve, reject) => {
			const permVal1 = await rolecomplete1
				.then(permVal => {
					return permVal;
				});
			const message = await i.reply({ embeds: [roleCompletedEmbed2], components: [permsSelectRow2] });
			const collector = message.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 60000 });
			collector.on('collect', async i => {
				i.deferReply();
				i.values.forEach(string => {
					if (string === 'managethreads') {
						permValue.push(PermissionsBitField.Flags.ManageThreads);
					}
					else if (string === 'managewebhooks') {
						permValue.push(PermissionsBitField.Flags.ManageWebhooks);
					}
					else if (string === 'mentioneveryone') {
						permValue.push(PermissionsBitField.Flags.MentionEveryone);
					}
					else if (string === 'moderatemembers') {
						permValue.push(PermissionsBitField.Flags.ModerateMembers);
					}
					else if (string === 'movemembers') {
						permValue.push(PermissionsBitField.Flags.MoveMembers);
					}
					else if (string === 'mutemembers') {
						permValue.push(PermissionsBitField.Flags.MuteMembers);
					}
					else if (string === 'priorityspeaker') {
						permValue.push(PermissionsBitField.Flags.PrioritySpeaker);
					}
					else if (string === 'readmessagehistory') {
						permValue.push(PermissionsBitField.Flags.ReadMessageHistory);
					}
					else if (string === 'requesttospeak') {
						permValue.push(PermissionsBitField.Flags.RequestToSpeak);
					}
					else if (string === 'sendmessages') {
						permValue.push(PermissionsBitField.Flags.SendMessages);
					}
					else if (string === 'sendmessagesinthreads') {
						permValue.push(PermissionsBitField.Flags.SendMessagesInThreads);
					}
					else if (string === 'sendttsmessages') {
						permValue.push(PermissionsBitField.Flags.SendTTSMessages);
					}
					else if (string === 'speak') {
						permValue.push(PermissionsBitField.Flags.Speak);
					}
					else if (string === 'stream') {
						permValue.push(PermissionsBitField.Flags.Stream);
					}
					else if (string === 'useapplicationcommands') {
						permValue.push(PermissionsBitField.Flags.UseApplicationCommands);
					}
					else if (string === 'useembeddedactivities') {
						permValue.push(PermissionsBitField.Flags.UseEmbeddedActivities);
					}
					else if (string === 'useexternalemojis') {
						permValue.push(PermissionsBitField.Flags.UseExternalEmojis);
					}
					else if (string === 'useexternalstickers') {
						permValue.push(PermissionsBitField.Flags.UseExternalStickers);
					}
					else if (string === 'usevad') {
						permValue.push(PermissionsBitField.Flags.UseVAD);
					}
					else if (string === 'viewauditlog') {
						permValue.push(PermissionsBitField.Flags.ViewAuditLog);
					}
					else if (string === 'viewchannel') {
						permValue.push(PermissionsBitField.Flags.ViewChannel);
					}
					else if (string === 'viewguildinsights') {
						permValue.push(PermissionsBitField.Flags.ViewGuildInsights);
					}

				});

				// i.guild.roles.create({ name: eName, permissions: permValue });

				
				resolve(permValue);
			});

			collector.on('ignore', async () => {
				await interaction.update({ embeds: [outOfTimeEmbed], components: [], ephemeral: true });
				reject();
			});
		});

		await rolecomplete2.then(permVal => {
			console.log(permVal.toString());
		});

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};