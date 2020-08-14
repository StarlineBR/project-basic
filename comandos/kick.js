module.exports = {
	name: 'kick',
	description: 'Marque um membro e expulse (mas não realmente).',
	guildOnly: true,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.reply('\`❌\`│ você precisa marcar um usuário para expulsá-lo!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`Você queria chutar: ${taggedUser.username}`);
	},
};