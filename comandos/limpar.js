module.exports = {
	name: 'limpar',
	description: 'limpe até 99 mensagens.',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('\`❌\`│ Número invalido, forneça um número válido.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('\`❌\`│ você precisa inserir um número entre 1 e 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('\`❌\`│ ocorreu um erro ao tentar remover mensagens neste canal!');
		});
	},
};