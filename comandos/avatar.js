module.exports = {
	name: 'avatar',
	description: 'Obtenha o URL do avatar do(s) usuário(s) marcado(s) ou do seu próprio avatar.',
	aliases: ['icon', 'pfp'],
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Seu avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `avatar de ${user.username}: <${user.displayAvatarURL({ dynamic: true })}>`;
		});

		message.channel.send(avatarList);
	},
};