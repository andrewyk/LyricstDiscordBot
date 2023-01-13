const helper = require('../helpers/modules');
const usersDynamo = require('../database/usersdynamo');

const removeSong = async(message) => {
  try{
    let userID = message.author.id;
    await helper.validate.validateUser(userID);

    var userSongList = await usersDynamo.getUserSongList(userID);
    helper.validate.validateRemoveSongListSize(userSongList);
    
    var songsReply = removeSongsListReply(userSongList);

    await message.reply(songsReply);
    await removeUserSong(message,userSongList);


  } catch(error){
    if (error.msg){
      message.reply(error.msg);
    } else {
      message.reply(helper.message.errorMsg);
    }
  }
};

const removeSongsListReply = (songList) => {

  let reply = `\n Please type a number from 1-${songList.length} to remove from the list below:`;
  reply += helper.genius.parseSongTitles(songList);
  return reply;

};

const removeUserSong = async (message, songList) => {
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
  
      let userID = message.author.id;
      let index = songIndex-1;
      let songChosen = songList[index];
      let userSongList = await usersDynamo.getUserSongList(userID);
      await removefromSongList(userID, index, userSongList);
      message.reply(`${songChosen} has been removed.`);
  
  
    });
  
  };

  const removefromSongList = async(userID, index, songList) => {

    delete songList[index];
    await usersDynamo.updateUserSong(userID,songList);
  
  };


module.exports = {
  removeSong
};