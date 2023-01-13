const AWS = require('aws-sdk');

AWS.config.update({

  region: process.env.AWS_DEFAULT_REGION,
  accessKeyID: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

});


const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_USERS = "USERS";
const TABLE_USERS_SONG = "USERS_SONGS";

const getUser = async (userID)=> {

  const params = {

    TableName: TABLE_USERS,
    Key:{
      UserID: userID
    }

  };

  let userData = await dynamoClient.get(params).promise();
  return userData.Item;

};

const addorUpdateUser = async(userInfo) => {
//add Users information if not exist
  const params = {
    TableName: TABLE_USERS,
    Item: userInfo

  };

  const userParams = {
    Key:{
      'UserID' : '123'
    },
    TableName : TABLE_USERS
  };

  let userData = await dynamoClient.get(userParams).promise();
  
  if (Object.keys(userData).length == 0) {
    // add USERS_SONGS record
    await addUserSong(userInfo.UserID, []);
    
  }

  return await dynamoClient.put(params).promise();

};

const addUserSong = async(userID, songList) => {

  const params = {
    TableName: TABLE_USERS_SONG,
    Item: {
      UserID: userID,
      SongList: songList
    }
  };
  return await dynamoClient.put(params).promise();
};

const getUserSongList = async(userID) => {

  const params = {
    TableName: TABLE_USERS_SONG,
    Key: {
      UserID:userID
    }
  };

  let userSongsData = await dynamoClient.get(params).promise();
  return userSongsData.Item.SongList;
};


module.exports = {
  getUser,
  addorUpdateUser,
  addUserSong,
  getUserSongList
};