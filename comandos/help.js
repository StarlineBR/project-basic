const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Liste todos os meus comandos ou informações sobre um comando específico.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
            const Discord = require('discord.js');
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Ajuda!')
            .addField(`Aqui está uma lista de todos os meus comandos:`,` \`\`\` ${commands.map(command => command.name).join(', ')}\`\`\` `)
            .setDescription(`\nVocê pode executar \`${prefix}help [nome do comandos]\` para obter informações sobre um comando específico!`)
			data.push(exampleEmbed);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('\`✅\`│ Eu enviei a você uma mensagem em sua DM com todos os meus comandos!');
				})
				.catch(error => {
					message.reply('\`❌\`│Talvez sua DM esteja bloqueada, desbloqueie para que eu consiga mandar a mensagem. ');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('\`❌\`│ esse não é um comando válido!');
		}

		data.push(`**Nome:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descrição:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

		data.push(`\`⏲️\`│ **Cooldown:** ${command.cooldown || 3} segundo(s)`);

		message.channel.send(data, { split: true });
	},
};