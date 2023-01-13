// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const Discord = require('discord.js');

const commands = require('./commands/modules');


const client = new Discord.Client();
const prefix = '!';


client.once('ready', () => {

  console.log('Online');

});

client.on("message", async (message) => {


  if (message.author.bot) {return;}
  if (!message.content.startsWith(prefix)) {return;}

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  
  switch(command) {

    case 'help':
      commands.help.help(message);
      break;
    
    case 'register':
      console.log('User register');
      commands.users.registerUsers(message);
      break;

    case 'song':
      console.log('searching song');
      commands.songs.sendSongInfo(message, args);
      break;
    
    case 'addsong':
      console.log('add song');
      commands.addsong.addSong(message,args);
      break;
    
    case 'songlist':
      console.log('show song list');
      commands.songlist.showSongList(message);
      break;
    
    case 'removesong':
      console.log('remove song');
      commands.removesong.removeSong(message);
      break;
      
    default:
      message.reply('please check commands: !help');

  }
});

client.login(process.env.DISCORD_TOKEN);