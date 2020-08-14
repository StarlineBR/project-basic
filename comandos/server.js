module.exports = {
	name: 'server',
	description: 'Exibir informações sobre este servidor.',
	execute(message) {
		message.channel.send(`Nome: ${message.guild.name}\nTotal de membros: ${message.guild.memberCount}`);
	},
};