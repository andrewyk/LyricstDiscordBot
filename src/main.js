const dotenv = require('dotenv').config();
const Discord = require('discord.js');

const commands = require('./commands/modules');


const client = new Discord.Client();
const prefix = '!';


client.once('ready', () => {

  console.log('Online')

})

client.on("message", async (message) => {


  if (message.author.bot) {return}
  if (!message.content.startsWith(prefix)) {return}

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  
  switch(command) {

    case 'help':

      commands.help(message)
      break;
    
    case 'login':
      console.log('User Login')
      commands.users.dynamo_loginUsers(message.author.id, message.author.username)
      break;

    case 'song':

      console.log('searching song')
      commands.songs.genius_searchSong(message, args)
      break;


    default:
      message.reply('please check commands: !help')
  }
})

client.login(process.env.DISCORD_TOKEN)