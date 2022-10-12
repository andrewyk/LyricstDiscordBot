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

            help(message)
            break;

        case 'song':

            console.log('searching song')
            genius_searchSong(message, args)
            break;

        case 'artist':
            console.log('searching artist')
            genius_searchArtist(message, args)
            break;

        default:
           message.reply('please check commands: !help')
    }
})

client.login(process.env.DISCORD_TOKEN)