module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Herbbot is ready and is logged in as ${client.user.tag}`);
	}
}