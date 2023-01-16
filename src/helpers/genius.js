const api = require('../api/modules');

const geniusSearchSong = async (songNameArray) => {
  //search songs and returns list of songs.

  try{
    let songTitlesHash  = await api.geniusSongApi.getGeniusSong(songNameArray);
    
    if (Object.keys(songTitlesHash).length == 0){
      throw {msg:'Song does not exist'};
    }

    return songTitlesHash;
  }
  
  catch(error) {
    if (error.msg) {
      throw error;
    } else {
      throw error.code;
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

const geniusSongInfo = async(songID) => {

  let songData = await api.geniusSongApi.getGeniusSongInfo(songID);
  return extractSongInfo(songData);
};

const extractSongInfo = (songData) => {
  let songInfoReply = `\n Song:    ${songData.title}`;
  songInfoReply += `\n Album:  ${songData.album.name}`;
  songInfoReply += `\n Artist:  ${songData.artist_names}`;
  songInfoReply += `\n Lyrics:  ${songData.description_annotation.annotatable.url}`;
  return songInfoReply;

};

module.exports = {
  geniusSearchSong,
  parseSongTitles,
  geniusSongInfo
};