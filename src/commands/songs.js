const api = require('../api/modules')


const genius_searchSong = async (message, songNameArray) => {

  try{
    let songTitlesArray  = await api.geniusSongApi.getGeniusSong(songNameArray)
    let songTitles = parseSongTitles(songTitlesArray)
    message.reply(songTitles)

  }
  catch(error) {
    console.log(error)
    message.reply('Error searching for song')
  }

}

/* Creates a string of song titles */
const parseSongTitles = (songTitlesArray) =>{

  let songTitles = ''

  if (songTitlesArray.length == 0){

    songTitles += '\n Song name does not exist.'

  } else {

    songTitlesArray.forEach((title, index) => {
	
			songTitles +=  '\n' + (index+1) + '.) ' + title 
  
    })

  }

  return songTitles

}


module.exports = {

	genius_searchSong

}