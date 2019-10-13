const Discord = require("discord.js");
const bot = new Discord.Client();

const token = 'NjIyNDUyNTY0NzUwNzYxOTg0.XaJLkQ.1ua-Ch5HURgoPEeyHV2UJ3PzR-0';

const PREFIX = '-';

bot.on('ready', () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity('Andrews Marketplace', { type: 'STREAMING' }).catch(console.error);
})

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(channel => channel.name === "〘🚩〙welcome");
    if(!channel) return;

    channel.send(`Welcome to Andrew's Marketplace, ${member} please read the rules`)

});

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            message.channel.send("Pinging...").then(m => {
                let ping = m.createdTimestamp - message.createdTimestamp
                let choises = ["Is this really my ping", "Is it okey?", "I hope it isn't bad"]
                let response = choises[Math.floor(Math.random() * choises.length)]

                m.edit(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``)
            })
            break;
        case 'credits':
            let embed1 = new Discord.RichEmbed()
            .setTitle('Who created this bot?')
            .addField("Andrew created this bot", "I'm glad that Andrew created me, too")
            .setColor(0x3498DB)
            .setThumbnail(message.guild.avatarURL)
            .setFooter('Im a good bot :)')
            message.channel.send(embed1)
            break;
        case 'clear':
            message.delete()
            if (!args[1]) return message.reply('Error please define second arg')
            message.channel.bulkDelete(args[1]);
            break;
        case 'player':
            let embed2 = new Discord.RichEmbed()
                .setTitle('Player Information')
                .addField('Player Name', message.author.username)
                .addField('Curent Server', message.guild.name)
                .setColor(0x3498DB)
                .setThumbnail(message.author.avatarURL)
                .setFooter('Im a good bot :)')
                message.channel.send(embed2);
            break;
        case 'kick':

             user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick('You got kicked!').then(() => {
                        message.reply(`Successfully kicked ${user.tag}`);
                    }).catch(err => {
                        message.reply('I was unable to kick the member')
                        console.log(err);
                    });
                } else {
                    message.reply("That user ins't in this guild")
                }
            } else {
                message.reply('You need to specify a member!')
            }

            break;
        case 'ban':

             user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.ban({ ression: 'You got banned!' }).then(() => {
                        message.reply(`Sucessfully banned ${user.tag}`)
                    })
                } else {
                    message.reply("That user ins\'t in this guild")
                }
            } else {
                message.reply('You need to specify a member!')
            }

            break;
            case 'help':
                    let embed3 = new Discord.RichEmbed()
                    .setTitle('The Commands Are')
                    .setColor(0x3498DB)
                    .setDescription("\nping\ncredits\nclear\nplayer\nkick\nban\nhelp")
                    .addField('Curent Server', message.guild.name)
                    .setThumbnail(message.guild.avatarURL)
                    .setFooter('Im a good bot :)')
                    message.channel.send(embed3)
            break;
            case 'say':
                    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send('You can not use this command')

                    let argsresult; 
                    let mChannel = message.mentions.channels.first();

                    message.delete()
                    if(mChannel) {
                        argsresult = args.slice(1).join(" ")
                        mChannel.send(argsresult)
                    } else{
                        argsresult = args.join(" ")
                        message.channel.send(argsresult)
                    }
        }
});

bot.login(token)
