const helper = require('../helpers/modules');
const usersDynamo = require('../database/usersdynamo');


const addSong = async (message, songNameArray) => {

  try{

    await helper.validate.validateUser(message.author.id);
    helper.validate.validateSongName(songNameArray);

    var songList = await helper.genius.geniusSearchSong(songNameArray);
    var userSongList = await usersDynamo.getUserSongList(message.author.id);
    helper.validate.validateAddSongListSize(userSongList);

    var songsReply = getSongsListReply(songList);

    await message.reply(songsReply);
    await getUserReply(message,songList);

  }catch(error){

    if (error.msg){
      message.reply(error.msg);
    } else {
      message.reply(helper.message.errorMsg);
    }
    
    
    
  }

};

const getSongsListReply = (songList) => {

  let reply = `\n Please type a number from 1-${songList.length} to choose from the list below:`;
  reply += helper.genius.parseSongTitles(songList);
  return reply;

};


const getUserReply = async (message, songList) => {
//Use discord Message Collector to get user input
  const filter = m => m.author.id === message.author.id;

  const collector = message.channel.createMessageCollector(filter, {
    max:1,
    time:60000,
  });

  collector.on('collect', async (m) => {
    
    let songIndex = parseInt(m.content);

    if (isNaN(songIndex) || (songIndex < 1 || songIndex > songList.length)){

      message.reply('Incorrect response, try !addsong again.');
      return;

    }

    let userID = m.author.id;
    let songChosen = songList[songIndex-1];
    let userSongList = await usersDynamo.getUserSongList(message.author.id);
    await addToSongList(userID, songChosen, userSongList);
    message.reply(`${songChosen} has been added.`);


  });

};

const addToSongList = async(userID, song, songList) => {

  songList.push(song);
  await usersDynamo.addUserSong(userID,songList);

};

module.exports = {

  addSong

};

