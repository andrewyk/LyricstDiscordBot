const helper = require('../helpers/modules');
const usersDynamo = require('../database/usersdynamo');

const showSongList = async(message) => {
  
  try{
    let userID = message.author.id;
    await helper.validate.validateUser(userID);
    var userSongList = await usersDynamo.getUserSongList(userID);
    var songListReply = helper.genius.parseSongTitles(userSongList);
    if (songListReply == ''){
      message.reply(helper.message.emptySongListMsg);
    } else {
      message.reply(songListReply);
    }

  } catch(error){

    if (error.msg){
      message.reply(error.msg);
    } else {
      message.reply(helper.message.errorMsg);
    }
  }
};



module.exports = {
  showSongList
};