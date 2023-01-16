const helper = require('../helpers/modules');
const songDynamo = require("../database/songdynamo");
const api = require("../api/modules");

const songInfo = async(message, songNameArray) => {
  // retrieve song info based on user input
  try{
    helper.validate.validateSongName(songNameArray);
    let songData  = await songDynamo.getSongData(songNameArray.join(" "));
    let songList = getSongTitles(songData.Items);
    helper.validate.validateSongInfoList(songList);

    let songReply = songInfoReply(songList);
    await message.reply(songReply);

    await getSongInfo(message,songData.Items);

  } catch(error){
    if (error.msg){
      message.reply(error.msg);
    } else {
      message.reply(helper.message.errorMsg);
    }
    console.log(error);
  }
};

const getSongTitles = (songObjectList) => {
  //created list of songs from items retrieved from dynamo
  var songList = [];
  for (let i = 0; i < songObjectList.length; i++){
    songList.push(songObjectList[i].SongTitle);
  }
  return songList;

};


const songInfoReply = (songList) => {
  // creates string of song titles for bot reply
  let reply = `\n Please type a number from 1-${songList.length} to choose from the list below:`;
  reply += helper.genius.parseSongTitles(songList);
  return reply;

};

const getSongInfo = async (message, songHashList) => {
  //Use discord Message Collector to get user input and display song info
    const filter = m => m.author.id === message.author.id;
  
    const collector = message.channel.createMessageCollector(filter, {
      max:1,
      time:60000,
    });
  
    collector.on('collect', async (m) => {
      
      let songIndex = parseInt(m.content);
  
      if (isNaN(songIndex) || (songIndex < 1 || songIndex > songHashList.length)){
  
        message.reply('Incorrect response, try !songinfo again.');
        return;
  
      }
      try{

        let index = songIndex-1;
        let songIDChosen = songHashList[index].SongID;
        /* 
        SongID has been found, now you have to use it to call genius api
        and extract the information you want to present.
        */
        let songInfoReply = await helper.genius.geniusSongInfo(songIDChosen);
        message.reply(songInfoReply);

  

      }
      catch(error){
        if (error.msg){
          message.reply(error.msg);
        } else {
          message.reply(helper.message.errorMsg);
        }
        console.log(error)
      }
      
    });
  
  };

module.exports = {
  songInfo
};
