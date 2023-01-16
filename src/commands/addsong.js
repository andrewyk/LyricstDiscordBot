const helper = require('../helpers/modules');
const usersDynamo = require('../database/usersdynamo');
const songDynamo = require('../database/songdynamo');


const addSong = async (message, songNameArray) => {
//add song into users songlist
  try{
    let userID = message.author.id;
    await helper.validate.validateUser(userID);
    helper.validate.validateSongName(songNameArray);

    //add song to users songlist
    let songHash = await helper.genius.geniusSearchSong(songNameArray);
    let songList = Object.keys(songHash);
    var userSongList = await usersDynamo.getUserSongList(userID);
    helper.validate.validateAddSongListSize(userSongList);

    var songsReply = addSongsListReply(songList);

    await message.reply(songsReply);
    
    //get user input to store songlist
    await addUserSong(message, songList, songHash);
  
  }catch(error){

    if (error.msg){
      message.reply(error.msg);
    } else {
      message.reply(helper.message.errorMsg);
    }
    
  }

};

const addSongsListReply = (songList) => {

  let reply = `\n Please type a number from 1-${songList.length} to choose from the list below:`;
  reply += helper.genius.parseSongTitles(songList);
  return reply;

};


const addUserSong = async (message, songList, songHash) => {
//Use discord Message Collector to get user input and store songlist and song
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
    //store in users song list
    try{
      let userID = m.author.id;
      let index = songIndex-1;
      let songChosen = songList[index];
      let userSongList = await usersDynamo.getUserSongList(userID);
      helper.validate.validateDuplicateSongList(userSongList, songChosen);
      await addToSongList(userID, songChosen, userSongList);
      message.reply(`${songChosen} has been added.`);

      //store song info in songs table
      let songTitle = songList[index];
      let songID = songHash[songTitle];
      await songDynamo.addorUpdateSong({
        SongTitle:songTitle, 
        SongID:songID, 
        SearchName:songTitle.toLowerCase()
      });
    }
    catch(error){
      if (error.msg){
        message.reply(error.msg);
      } else {
        message.reply(helper.message.errorMsg);
      }
    }
  });

};

const addToSongList = async(userID, song, songList) => {

  songList.push(song);
  await usersDynamo.updateUserSong(userID,songList);

};

module.exports = {

  addSong

};

