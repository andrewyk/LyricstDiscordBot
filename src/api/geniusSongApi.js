const axios = require('axios')
const geniusHelperApi= require('./geniusHelperApi')

/* Use Genius Api to search song information based on song name */
const getGeniusSong = async (songNameArray) => {

  
  const songName = songNameArray.join(' ')

  const searchUrl = 'https://api.genius.com/search'
  const client_access_token = geniusHelperApi.getAccessToken()
  let songData = await axios.get(searchUrl, {params:{q:songName, access_token: client_access_token}})
  return extractSongTitles(songData.data.response.hits)
}

/* Extracts song title from response data */
const extractSongTitles = (songDataArray) => {

  const songTitlesList = []
    
  songDataArray.forEach((data) => {
    if (data.type == 'song'){

      songTitlesList.push(data.result.full_title)

    }

  })

  return songTitlesList
}



module.exports = {

  getGeniusSong

}