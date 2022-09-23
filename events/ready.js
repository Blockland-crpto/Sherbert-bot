module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`SherbertBot is ready and is logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: 'help with AmazingBot' }], status: 'online' });
		console.log('set the presence');
	},
};