const usersDynamo = require('../database/usersdynamo');

const validateUser = async(userID) => {

  var user = await usersDynamo.getUser(userID);
  if (user == undefined){
    throw {msg:'User not found, please register with !register command.'};
  }
};

const validateSongName = (songNameArray) => {

  if (songNameArray.length == 0){
    throw {msg:"Please include valid song name."};
  }

};

const validateAddSongListSize = (userSongList) => {

  if (userSongList.length == 10) {
    throw {msg:'Songs added is maxed, please use "!removesong" command to remove songs'};
  }
};

const validateRemoveSongListSize = (userSongList) => {
  if (userSongList.length == 0) {
    throw {msg:'Songs list is empty, please use "!addsong" command to add songs'};
  }
};

const validateDuplicateSongList = (userSongList, songTitle) => {
  
  if (userSongList.includes(songTitle)){
    throw {msg:'Song has already been added, please try again and add a different song.'};
  }
};

const validateSongInfoList = (songList) =>{
  if (songList.length == 0){
    throw {msg:'Song could not be found, please use !addsong to add song and try again.'};
  }
};





module.exports = {

  validateUser,
  validateSongName,
  validateAddSongListSize,
  validateRemoveSongListSize,
  validateDuplicateSongList,
  validateSongInfoList

};