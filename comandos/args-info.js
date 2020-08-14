module.exports = {
	name: 'args-info',
	description: 'Informações sobre os argumentos fornecidos.',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Primeiro argumento: ${args[0]}`);
	},
};