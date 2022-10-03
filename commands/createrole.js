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
			.setDescription(`Welcome to SherbertBots Role Creation App! in order to create the role ${eName}, you will have to select permissions the role should have, please select the basic permissions that the ${eName} role should have`);

		const roleCompletedEmbed2 = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('role creation')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`Great! now please select the voice permissions that the ${eName} role should have`);

		const roleCompletedEmbed3 = new EmbedBuilder()
			.setColor(embedColor)
			.setTitle('role creation')
			.setAuthor({ name: embedAuthorName })
			.setDescription(`Last step! select in the command menu what admin and moderation permissions ${eName} should have, if none just open and close the menu`);

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
				label: 'attach files',
				description: 'Allows the role to attach files to messages',
				value: 'attachfiles',
				default: true,
			},
			{
				label: 'change their own nickname',
				description: 'Allows the role to change their own nickname',
				value: 'changetheirownnickname',
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
				label: 'embed links',
				description: 'Allows the role to send embeded links in chat',
				value: 'embedlinks',
			},
			{
				label: 'manage messages',
				description: 'Allows the role to delete and edit messages sent by users lower then there rank',
				value: 'managemessages',
			},

			{
				label: 'manage threads',
				description: 'Allows the role to manage threads created by users below them in rank',
				value: 'managethreads',
			},
			{
				label: 'read message history',
				description: 'Allows the role to read past messages',
				value: 'readmessagehistory',
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
			},
			{
				label: 'use external stickers',
				description: 'Allows the role to use stickers from other servers',
				value: 'useexternalstickers',
			},
			{
				label: 'view channel',
				description: 'Allows the role to view any channels (except private channels)',
				value: 'viewchannel',
			},
		];

		const permSelectOption2 = [
			{
				label: 'connect to voice channels',
				description: 'Allows the role to join voice channels (does not apply to private ones)',
				value: 'connecttovoicechannels',
				default: true,
			},
			{
				label: 'deafen members',
				description: 'Allows the role to deafen members below there rank',
				value: 'deafenmembers',
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
				label: 'request to speak',
				description: 'Allows the role to request to speak in stage voice channels',
				value: 'requesttospeak',
			},
			{
				label: 'speak',
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
				label: 'use voice activity dectection',
				description: 'Allows the role to use voice activity detection in voice chats',
				value: 'usevad',
				default: true,
			},
		];

		const permSelectOption3 = [
			{
				label: 'administrator permissions',
				description: 'Allows the role to have all the permissions',
				value: 'administrator',
			},
			{
				label: 'banning permissions',
				description: 'Allows the role to ban/unban users from your server',
				value: 'banningpermissions',
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
			{
				label: 'manage webhooks',
				description: 'Allows the role to manage webhooks created by users below them in rank',
				value: 'managewebhooks',
			},
			{
				label: 'moderate members',
				description: 'Allows the role to moderate users below there rank',
				value: 'moderatemembers',
			},
			{
				label: 'view audit log',
				description: 'Allows the role to view the server audit log',
				value: 'viewauditlog',
			},
			{
				label: 'view server insights',
				description: 'Allows the role to view your servers insights',
				value: 'viewguildinsights',
			},
		];

		const colorSelectOption = [
			{
				label: 'default',
				description: 'select the default role color',

			}
		];

		const permSelectMenu1 = new SelectMenuBuilder()
			.setCustomId('basicPerms')
			.setPlaceholder('No basic permissions selected')
			.setMinValues(1)
			.setMaxValues(permSelectOption1.length)
			.addOptions(permSelectOption1);

		const permSelectMenu2 = new SelectMenuBuilder()
			.setCustomId('voicePerms')
			.setPlaceholder('No voice permissions selected')
			.setMinValues(1)
			.setMaxValues(permSelectOption2.length)
			.addOptions(permSelectOption2);

		const permSelectMenu3 = new SelectMenuBuilder()
			.setCustomId('smPerms'			
			.setPlaceholder('No server management permissions selected')
			.setMinValues(0)
			.setMaxValues(permSelectOption3.length)
			.addOptions(permSelectOption3);

		const permsSelectRow1 = new ActionRowBuilder()
			.addComponents(permSelectMenu1);

		const permsSelectRow2 = new ActionRowBuilder()
			.addComponents(permSelectMenu2);

		const permsSelectRow3 = new ActionRowBuilder()
			.addComponents(permSelectMenu3);

		/*
		const colorSelectRow = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('colorSelect')
					.setPlaceholder('No color selected')
					.addOptions([

					])
			)
		*/

		const completeButtonRow = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('cancel')
					.setLabel('Quit')
					.setStyle(ButtonStyle.Danger),
			);

		const message = await interaction.reply({ embeds: [roleCreateEmbed], components: [permsSelectRow1, permsSelectRow2, permsSelectRow3, completeButtonRow] });
		const collector = message.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 15000 });
		let num;
		collector.on('collect', async i => {
			
			if (i.customId === 'basicPerms') {
				i.values.forEach(string => {
					if (string === 'addreactionstomessages') {
						permValue.push(PermissionsBitField.Flags.AddReactions);
					}
					else if (string === 'attachfiles') {
						permValue.push(PermissionsBitField.Flags.AttachFiles);
					}
					else if (string === 'changetheirownnickname') {
						permValue.push(PermissionsBitField.Flags.ChangeNickname);
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
					else if (string === 'embedlinks') {
						permValue.push(PermissionsBitField.Flags.EmbedLinks);
					}
					else if (string === 'managemessages') {
						permValue.push(PermissionsBitField.Flags.ManageMessages);
					}
					else if (string === 'managethreads') {
						permValue.push(PermissionsBitField.Flags.ManageThreads);
					}
					else if (string === 'mentioneveryone') {
						permValue.push(PermissionsBitField.Flags.MentionEveryone);
					}
					else if (string === 'readmessagehistory') {
						permValue.push(PermissionsBitField.Flags.ReadMessageHistory);
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
					else if (string === 'viewchannel') {
						permValue.push(PermissionsBitField.Flags.ViewChannel);
					}
				});
				permSelectMenu1.setDisabled(true);
				num++;
			}
			else if (i.customId === 'voicePerms') {
				im.values.forEach(string2 => {
					if (string2 === 'connecttovoicechannels') {
						permValue.push(PermissionsBitField.Flags.Connect);
					}
					else if (string2 === 'deafenmembers') {
						permValue.push(PermissionsBitField.Flags.DeafenMembers);
					}
					else if (string2 === 'movemembers') {
						permValue.push(PermissionsBitField.Flags.MoveMembers);
					}
					else if (string2 === 'mutemembers') {
						permValue.push(PermissionsBitField.Flags.MuteMembers);
					}
					else if (string2 === 'priorityspeaker') {
						permValue.push(PermissionsBitField.Flags.PrioritySpeaker);
					}
					else if (string2 === 'requesttospeak') {
						permValue.push(PermissionsBitField.Flags.RequestToSpeak);
					}
					else if (string2 === 'speak') {
						permValue.push(PermissionsBitField.Flags.Speak);
					}
					else if (string2 === 'stream') {
						permValue.push(PermissionsBitField.Flags.Stream);
					}
					else if (string2 === 'usevad') {
						permValue.push(PermissionsBitField.Flags.UseVAD);
					}
				});
				permSelectMenu2.setDisabled(true);
				num++;
			}
			else if (i.customId === 'smPerms') {
				i.values.forEach(string3 => {
					if (string3 === 'administrator') {
						permValue.push(PermissionsBitField.Flags.Administrator);
					}
					else if (string3 === 'banningpermissions') {
						permValue.push(PermissionsBitField.Flags.BanMembers);
					}
					else if (string3 === 'kickmembers') {
						permValue.push(PermissionsBitField.Flags.KickMembers);
					}
					else if (string3 === 'managechannel') {
						permValue.push(PermissionsBitField.Flags.ManageChannels);
					}
					else if (string3 === 'manageemojisandstickers') {
						permValue.push(PermissionsBitField.Flags.ManageEmojisAndStickers);
					}
					else if (string3 === 'managenicknames') {
						permValue.push(PermissionsBitField.Flags.ManageNicknames);
					}
					else if (string3 === 'manageroles') {
						permValue.push(PermissionsBitField.Flags.ManageRoles);
					}
					else if (string3 === 'manageevents') {
						permValue.push(PermissionsBitField.Flags.ManageEvents);
					}
					else if (string3 === 'manageguild') {
						permValue.push(PermissionsBitField.Flags.ManageGuild);
					}
					else if (string3 === 'managewebhooks') {
						permValue.push(PermissionsBitField.Flags.ManageWebhooks);
					}
					else if (string3 === 'moderatemembers') {
						permValue.push(PermissionsBitField.Flags.ModerateMembers);
					}
					else if (string3 === 'viewauditlog') {
						permValue.push(PermissionsBitField.Flags.ViewAuditLog);
					}
					else if (string3 === 'viewguildinsights') {
						permValue.push(PermissionsBitField.Flags.ViewGuildInsights);
					}

				});
				permSelectMenu3.setDisabled(true);
				num++;
			}

			if (num === 3) {
				console.log(permValue.toString());
			}
			
		});

		const buttonCollector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });
		buttonCollector.on('collect', async i => {
			if (i.customId === 'cancel') {
				await i.update({ embeds: [endedEmbed], components: [] });
				return 0;
			}
		});

		client.on('shardError', error => {
			console.error('Websocket encountered an error', error);
		});
	},
};