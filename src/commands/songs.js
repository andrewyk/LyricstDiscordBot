const helper = require('../helpers/modules');

const sendSongInfo = async(message, songNameArray) => {

  try{

    helper.validate.validateSongName(songNameArray);

    let songList = await helper.genius.geniusSearchSong(songNameArray);
  
    message.reply(parseSongTitles(songList));
  
  } 
  catch(error){
    if (error.msg){
      message.reply(error.msg);
    } else {
      message.reply('Error has occured when searching song. Please try again.');
    }
  }
};


/* Creates a string of song titles */
const parseSongTitles = (songTitlesArray) =>{

  let songTitles = '';

  songTitlesArray.forEach((title, index) => {

    songTitles +=  '\n' + (index+1) + '.) ' + title ;

  });

  return songTitles;

};


module.exports = {
  sendSongInfo,
  parseSongTitles

};