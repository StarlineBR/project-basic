const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
console.log(`com【${client.users.cache.size}】usuários e 【${client.guilds.cache.size}】 servidores.`);
console.log(process.version)
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('\`❌\`│ Não consigo executar esse comando dentro de DMs!');
	}

	if (command.args && !args.length) {
		let reply = `\`❌\`│ Você não forneceu nenhum argumento, ${message.author}!`;

		if (command.usage) {
			reply += `\n \`❌\`│ O uso adequado seria: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`\`⏲️\`│ por favor, espere ${timeLeft.toFixed(1)} segundo(s) antes de reutilizar o comando \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('\`❌\`│ ocorreu um erro ao tentar executar esse comando!');
    }
});
client.on("message", async message => {
    if(message.channel.type === "dm") return;
    if(message.content.startsWith(`<@${client.user.id}>`)|| message.content.startsWith(`<@!${client.user.id}>`)){ //  MOBILE / PC
      let cmdtotal = client.commands.size;
      let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField(`Meu prefixo é:`,`${prefix}`)
    .addField("Comandos totais do bot:", `${cmdtotal}`)
    .setFooter(` Comando executado por: ${message.author.tag}`,`https://i.imgur.com/32O82Jv.gif`) 
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024}))
     message.channel.send(embed)
  
  }
})
client.login(token);