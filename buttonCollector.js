const { ActionRowBuilder, ComponentType } = require('discord.js');

async function buttonCollector(miniinteraction) {

	let collector = miniinteraction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });

	collector.on('collect', async i => {
		if (i.user.id === miniinteraction.user.id) {
			if (i.customId === 'utils') {
				await i.update({ embeds: [utilListEmbed], components: [row1] });
				collector = null;
			}
			else if (i.customId === 'closehelp') {
				await miniinteraction.deleteReply();
				collector = null;
			}
			return 0;
		}
		else {
			i.reply({ content: 'Were sorry but this app is not being used by you, please create your own help app by using the /help command', ephemeral: true });
			return 0;
		}
	});

	collector.on('end', async collected => {
		collector = null;
		miniinteraction.deleteReply();
	})
			
	client.on('interactionCreate', async inter => {
		console.log(`${inter} has occured, closing buttons`);
		collector = null;
		return 0;
	});
}