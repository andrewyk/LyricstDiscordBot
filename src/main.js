const dotenv = require('dotenv').config();
const Discord = require('discord.js');


const client = new Discord.Client();
const prefix = '-';

client.once('ready', () => {

    console.log('Online')

})

client.on("message", async (message) => {


    if (message.author.bot) {return}
    if (!message.content.startsWith(prefix)) {return}



})

client.login(process.env.DISCORD_TOKEN)