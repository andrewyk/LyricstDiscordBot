
const geniusApi = require('../../api/geniusApi/modules')


genius_searchSong = async (message, songNameArray) => {

   try{
      let songTitlesArray  = await geniusSongApi(songNameArray)
      let songTitles = parseSongTitles(songTitlesArray)
      message.reply(songTitles)

   }
   catch(error) {

      console.log(error)
      message.reply('error')

   }

}

/* Creates a string of song titles */
parseSongTitles = (songTitlesArray) =>{

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