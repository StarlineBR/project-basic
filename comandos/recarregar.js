  
module.exports = {
	name: 'recarregar',
	description: 'Recarrega um comando',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`\`❌\`│ Não há comando com nome ou apelido \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`\`✅\`│ comando \`${command.name}\` foi recarregado!`);
		} catch (error) {
			console.log(error);
			message.channel.send(`\`❌\`│ Ocorreu um erro ao recarregar um comando \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};
