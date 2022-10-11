const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const { help } = require('./commands/help');


const commands = require('./commands/modules');

const client = new Discord.Client();
const prefix = '!';


client.once('ready', () => {

    console.log('Online')

})

client.on("message", async (message) => {


    if (message.author.bot) {return}
    //if (!message.content.startsWith(prefix)) {return}

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

        default:
            console.log('please check commands')
    }
})

client.login(process.env.DISCORD_TOKEN)