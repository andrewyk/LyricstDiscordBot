const api = require('../api/modules');

const geniusSearchSong = async (songNameArray) => {
  //search songs and returns list of songs.

  try{
    let songTitlesArray  = await api.geniusSongApi.getGeniusSong(songNameArray);
    
    if (songTitlesArray.length == 0){
      throw {msg:'Song does not exist'};
    }

    return songTitlesArray;
  }
  
  catch(error) {
    if (error.msg) {
      throw error;
    } else {
      throw error.code;
    }
  }

};

module.exports = {
  geniusSearchSong
};