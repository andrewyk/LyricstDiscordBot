const helper = require('../helpers/modules');

const sendSongInfo = async(message, songNameArray) => {

  try{

    helper.validate.validateSongName(songNameArray);

    let songList = await helper.genius.geniusSearchSong(songNameArray);
  
    message.reply(helper.genius.parseSongTitles(songList));
  
  } 
  catch(error){
    if (error.msg){
      message.reply(error.msg);
    } else {
      message.reply(helper.message.errorMsg);
    }
  }
};


module.exports = {
  sendSongInfo

};