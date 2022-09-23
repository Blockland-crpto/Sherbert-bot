const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const path = require('node:path');
const fs = require('node:fs');

const herbbotVersion = '1.0.0';
exports.herbbotVersion = herbbotVersion;

const embedColor = 0x0099F;
exports.embedColor = embedColor;
const embedAuthor = 'Herbbot';
exports.embedAuthor = embedAuthor;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] });
exports.client = client;

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if(event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

for(const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if(!interaction.isChatInputCommand()) return;
	
	const commandName = interaction.client.commands.get(interaction.commandName);

	if(!command) return;

	try {
		await command.execute(interaction);
	} catch(error) {
		console.error(error);
		await interaction.reply({ content: 'Were sorry, but a error occured while trying to execute this command. Please try again later', ephemeral: true });
	}
})

client.login(token);