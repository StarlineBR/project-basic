module.exports = {
	name: 'user-info',
	description: 'Exibir informações sobre você.',
	execute(message) {
		message.channel.send(`Seu username: ${message.author.username}\nSeu ID: ${message.author.id}`);
	},
};