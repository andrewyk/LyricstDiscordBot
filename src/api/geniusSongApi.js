const axios = require('axios');
const geniusHelperApi= require('./geniusHelperApi');

const client_access_token = geniusHelperApi.getAccessToken();

/* Use Genius Api to search song information based on song name */
const getGeniusSong = async (songNameArray) => {

  const songName = songNameArray.join(' ');

  const searchUrl = 'https://api.genius.com/search';
  try{
    let songData = await axios.get(searchUrl, {params:{q:songName, access_token: client_access_token}});
    return extractSongData(songData.data.response.hits);
  } catch(error) {

    throw error.code;

  }
 
};

const getGeniusSongInfo = async(songID) => {
  const searchUrl = 'https://api.genius.com/songs/' + songID;

  try{
    let songData = await axios.get(searchUrl, {params:{access_token:client_access_token}});
    return songData.data.response.song;
  }
  catch(error){
    throw error.code;
  }
};

/* Extracts song title from response data */
const extractSongData = (songDataArray) => {

  const songTitlesHash = {};

  songDataArray.forEach((data) => {
    if (data.type == 'song'){
      songTitlesHash[data.result.full_title] = data.result.id;

    }

  });
  return songTitlesHash;
};



module.exports = {

  getGeniusSong,
  getGeniusSongInfo

};