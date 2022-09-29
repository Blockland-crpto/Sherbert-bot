const { Client, GatewayIntentBits, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token, embedColor } = require('./config.json');
const { SherbertBotEmbedErrorPage } = require('./misc/embedObjects');
const process = require('node:process');
const path = require('node:path');
const fs = require('node:fs');
const keyv = require('keyv');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildBans] });
const db = new keyv('sqlite://res/db/db.sqlite');

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	}
	catch (error) {

		new SherbertBotEmbedErrorPage(error.name, error.code, error.message, interaction);
		console.error(error);
	}
});

client.login(token);

process.on('unhandledRejection', error => {
	console.error('A unhandledRejection occured:', error);
});

db.on('error' => console.error(`Keyv connection error ${error}`));