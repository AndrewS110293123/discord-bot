  const Discord = require("discord.js");
  const bot = new Discord.Client();
  const ms = require('ms')

  const token = 'NjIyNDUyNTY0NzUwNzYxOTg0.XaNUmg.c5FlzdE8wba53HGaDGoX-BzUU-k';

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

  bot.on('message', async message => {

      let args = message.content.substring(PREFIX.length).split(" ");

      switch (args[0]) {
          case 'ping':
              message.channel.send("Pinging...").then(m => {
                  let ping = m.createdTimestamp - message.createdTimestamp
                  let choises = ["Is this really my ping", "Is it okey?", "I hope it isn't bad"]
                  let response = choises[Math.floor(Math.random() * choises.length)]

                  m.edit(`${response}: Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ping)}\``);
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
              message.channel.bulkDelete(args[1]).then
              message.reply(`Deleted ${args[1]} messages!`)
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
                      .setDescription("\nping\ncredits\nclear\nplayer\nkick\nban\nsay\nmute")
                      .addField('Curent Server', message.guild.name)
                      .setThumbnail(message.guild.avatarURL)
                      .setFooter('Im a good bot :)')
                      message.channel.send(embed3)
              break;
                case 'say':
                      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('You can not use this command')
                      let botmessage = args.slice(1).join(" ")
                      message.delete().catch()
                      message.channel.send(botmessage)
                      break;
                case'mute' :
                if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('You can not use this command')
                let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
                if(!person) return message.reply("Couldn't find that member");

                let mainrole = message.guild.roles.find(role => role.name === "Peeps")
                let muterole = message.guild.roles.find(role => role.name === "muted")

                if(!muterole) return message.reply("Couldn't find the mute role");

                let time = args[2];

                if(!time){
                    return message.reply("You didn't specify a time");

                }

                person.removeRole(mainrole.id);
                person.addRole(muterole.id);

                message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}!`)

                setTimeout(function(){
                    person.addRole(mainrole.id)
                    person.removeRole(muterole.id);
                    message.channel.send(`@${person.user.tag} has been unmuted!`)

                }, ms(time));
                break;
                case 'react':
                    message.react(`${args[1]}`)
                break;
          }
  });

  bot.login(token)
